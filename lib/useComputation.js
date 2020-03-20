import React from "react";
import { renderToString } from "react-dom/server";
import { HooksCache } from "./HooksCache";
import { MySpecialComputation } from "./MySpecialComputation";
const HOOKS_RESULT_YTD = "HOOKS_RESULT_YTD";

const isServer = () => typeof window === "undefined";

function processInput(name, input) {
  // This is our isomorphic cache
  const cache = HooksCache.instance().get(name);
  console.log(cache);
  const key = JSON.stringify(input);
  const value = cache.get(key);
  if (isServer() && value == null) {
    // we are in the analysis phase set a flag to run the computation later
    cache.set(key, HOOKS_RESULT_YTD);
  }
  return value;
}

export function useComputation(name, computation, input) {
  const initInput = processInput(name, input);
  const [output, setOutput] = React.useState(initInput);

  async function callComputation(input_) {
    const result = await computation(input_);
    setOutput(result);
  }

  return [output, callComputation];
}

export const HooksCacheScripts = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.__HOOKS_CACHE=${JSON.stringify(HooksCache.instance())}`
      }}
    ></script>
  );
};

export function withSsrHooks(Doc) {
  const origGetInitialProps = Doc.getInitialProps || (() => {});

  Doc.getInitialProps = async ctx => {
    const { AppTree } = ctx;
    renderToString(<AppTree />);

    const entries = HooksCache.instance()
      .get("MySpecialComputation")
      .entries();

    for (let [key, value] of entries) {
      if (value === HOOKS_RESULT_YTD) {
        const newVal = await MySpecialComputation(JSON.parse(key));

        HooksCache.instance()
          .get("MySpecialComputation")
          .set(key, newVal);
      }
    }

    return origGetInitialProps(ctx);
  };

  return Doc;
}
