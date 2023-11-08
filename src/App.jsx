// import React from "react";
// import { AmityUiKitProvider} from "@amityco/ui-kit-open-source"
// import { AmityUiKitChat} from "@amityco/ui-kit-open-source"
// const apiKey = "b0e9eb0c6edda46d48658d14575d178dd55f8fb4b3323e2b";
// const userId = "stevo";
// function App() {
//     return <div className="App">
//         app
//         <AmityUiKitProvider
//             apiKey={apiKey}
//             userId={userId}
//             displayName={userId}
//             apiRegion={"eu"}
//         >
//             App
//             <AmityUiKitChat />
//         </AmityUiKitProvider>
//     </div>
// }

import {
  AmityUiKitProvider,
  AmityUiKitChat,
} from "@amityco/ui-kit-open-source";
const userId = "stevo";
const apiKey = "b0e9eb0c6edda46d48658d14575d178dd55f8fb4b3323e2b";
export default function App() {

    require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

  return (
    <div className="App">
      <AmityUiKitProvider
        key={userId}
        apiKey={apiKey}
        userId={userId}
        displayName={userId}
        apiRegion={"eu"}
      >
        <AmityUiKitChat />
      </AmityUiKitProvider>
    </div>
  );
}
