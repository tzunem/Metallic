import React from "react";
import Nav from "../components/nav.js";
import Head from "../components/head.js";
import Obfuscate from "../components/obfuscate.js";
import Proxy from "../components/proxy.js";
import globeSVG from "../assets/globe.svg";
import gitems from "../apps.js";
import { getLink } from "../util.js";

function Apps() {
  var [proxyConfig, setProxyConfig] = React.useState({
    open: false,
    url: null,
    title: null,
    icon: null,
  });

  function goApp(config) {
    try {
      setProxyConfig({
        open: true,
        url: getLink(config.url),
        title: null,
        icon: null,
      });
    } catch (err) {
      alert(err.toString());
    }
  }

  var [appsSearchTerm, setAppsSearchTerm] = React.useState("");

  function searchAppsType(e) {
    setAppsSearchTerm(e.target.value.toLowerCase());
  }

  const gitemssearched = gitems.filter((item) => {
    if (!appsSearchTerm) {
      return item;
    } else {
      return item.name.toLowerCase().includes(appsSearchTerm);
    }
  });
  return (
    <>
      <Head defaultTitle="Apps | Metallic"></Head>
      <Nav />
      <Proxy config={proxyConfig} configChange={(e) => setProxyConfig(e)} />
      <div className="omniboxcontainersearch omniboxcontainer">
        <div className="omnisearch omnibox">
          <div className="searchicon">
            <svg
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
            </svg>
          </div>
          <input
            onKeyUp={searchAppsType}
            autoComplete="off"
            autoFocus
            id="search"
            className="search"
          />
        </div>
      </div>
      {!gitemssearched.length ? (
        <div className="desc">No results found.</div>
      ) : (
        ""
      )}
      <div className="gitems">
        {gitemssearched.map((item, key) => {
          return (
            <div
              onClick={() => goApp(item)}
              style={{
                backgroundImage: `url(${JSON.stringify(
                  item.icon
                )}), url(${JSON.stringify(globeSVG)})`,
                backgroundSize: "cover",
                backgroundPosition: "0% 0%",
              }}
              className="gitem"
              key={key}
            >
              <div className="gtext">
                <Obfuscate>{item.name}</Obfuscate>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Apps;