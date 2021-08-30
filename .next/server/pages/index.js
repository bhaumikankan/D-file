"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 859:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages)
});

;// CONCATENATED MODULE: external "react/jsx-runtime"
const jsx_runtime_namespaceObject = require("react/jsx-runtime");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "semantic-ui-react"
const external_semantic_ui_react_namespaceObject = require("semantic-ui-react");
;// CONCATENATED MODULE: external "web3"
const external_web3_namespaceObject = require("web3");
var external_web3_default = /*#__PURE__*/__webpack_require__.n(external_web3_namespaceObject);
;// CONCATENATED MODULE: ./web3.js

let web3;

if (false) {} else {
  web3 = new (external_web3_default())(new (external_web3_default()).providers.HttpProvider('https://rinkeby.infura.io/v3/c418d4eba8b84ff092648af21a3e7e6f'));
}

/* harmony default export */ const web3_0 = (web3);
;// CONCATENATED MODULE: ./Ethereum/build/FileContract.json
const FileContract_namespaceObject = JSON.parse('{"Mt":[{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"Files","outputs":[{"internalType":"uint256","name":"fileId","type":"uint256"},{"internalType":"string","name":"filename","type":"string"},{"internalType":"string","name":"filehash","type":"string"},{"internalType":"uint256","name":"filesize","type":"uint256"},{"internalType":"string","name":"filedescription","type":"string"},{"internalType":"uint256","name":"uploadTime","type":"uint256"},{"internalType":"address","name":"uploader","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_filename","type":"string"},{"internalType":"string","name":"_filehash","type":"string"},{"internalType":"uint256","name":"_filesize","type":"uint256"},{"internalType":"string","name":"_filedescription","type":"string"}],"name":"addFiles","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"fileIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]}');
;// CONCATENATED MODULE: ./contract.js

 //0x85Ee842b9Ddd9d9F5Bb39E984a2bF39f3a8cAd75
//old-0xe2d7aaf9896cE10b7b0d04C1f7185310724fD0Ea

const address = '0x85Ee842b9Ddd9d9F5Bb39E984a2bF39f3a8cAd75';
/* harmony default export */ const contract = (new web3_0.eth.Contract(FileContract_namespaceObject.Mt, address));
;// CONCATENATED MODULE: external "ipfs-http-client"
const external_ipfs_http_client_namespaceObject = require("ipfs-http-client");
;// CONCATENATED MODULE: external "next/router"
const router_namespaceObject = require("next/router");
;// CONCATENATED MODULE: ./pages/index.js









const ipfs = (0,external_ipfs_http_client_namespaceObject.create)('https://ipfs.infura.io:5001/api/v0');

const Home = ({
  allFiles
}) => {
  const router = (0,router_namespaceObject.useRouter)();
  const [file, setFile] = external_react_default().useState(null);
  const [fileName, setFileNmae] = external_react_default().useState('');
  const [fileType, setFileType] = external_react_default().useState('');
  const [buffer, setBuffer] = external_react_default().useState(null);
  const [Description, setDescription] = external_react_default().useState('');
  const [fileSize, setfileSize] = external_react_default().useState('');
  const [load, setLoad] = external_react_default().useState(false);
  const [error, setError] = external_react_default().useState(false);

  const updateFile = e => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    const reader = new window.FileReader(file);
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      setBuffer(reader.result);
      setFileNmae(file.name);
      setFileType(file.type);
      setfileSize(file.size);
    };
  };

  const uploadFile = async e => {
    e.preventDefault();
    setLoad(true);

    try {
      const added = await ipfs.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      contract.methods.addFiles(fileName, url, fileSize, Description).send({
        from: (await web3_0.eth.getAccounts())[0]
      });
      setLoad(false);
      router.push('/');
    } catch (error) {
      //console.log('Error uploading file: ', error.message)
      setError(error.message);
      setLoad(false);
    }
  };

  return /*#__PURE__*/jsx_runtime_namespaceObject.jsx("div", {
    children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Container, {
      children: [/*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Menu, {
        style: {
          marginTop: '10px'
        },
        children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Menu.Item, {
          children: /*#__PURE__*/jsx_runtime_namespaceObject.jsx("h1", {
            children: "D-File Share"
          })
        }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Menu.Item, {
          children: /*#__PURE__*/jsx_runtime_namespaceObject.jsx("p", {
            children: "A decentralized file share application"
          })
        })]
      }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Card, {
        fluid: true,
        children: /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.CardContent, {
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Form, {
            onSubmit: uploadFile,
            error: error,
            children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Form.Input, {
              onChange: e => setDescription(e.target.value),
              label: "Description",
              required: true,
              placeholder: "Enter about the file"
            }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Form.Input, {
              onChange: updateFile,
              label: "File",
              type: "file",
              placeholder: ""
            }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Button, {
              primary: true,
              loading: load,
              children: "Submit"
            }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Message, {
              error: true,
              children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Message.Header, {
                children: "Opps!!"
              }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx("p", {
                children: error
              })]
            })]
          })
        })
      }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Table, {
        celled: true,
        children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.Header, {
          children: /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Table.Row, {
            children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.HeaderCell, {
              children: "File name"
            }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.HeaderCell, {
              children: "File description"
            }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.HeaderCell, {
              children: "Uploader Address"
            }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.HeaderCell, {
              children: "File shareable link"
            })]
          })
        }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.TableBody, {
          children: allFiles.map((file, index) => {
            return /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Table.Row, {
              children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.Cell, {
                children: file['1']
              }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.Cell, {
                children: file['4']
              }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Table.Cell, {
                children: file['6']
              }), /*#__PURE__*/(0,jsx_runtime_namespaceObject.jsxs)(external_semantic_ui_react_namespaceObject.Table.Cell, {
                children: [/*#__PURE__*/jsx_runtime_namespaceObject.jsx(external_semantic_ui_react_namespaceObject.Button, {
                  positive: true,
                  onClick: () => navigator.clipboard.writeText(`${file[2]}`),
                  children: "Click here to copy link"
                }), /*#__PURE__*/jsx_runtime_namespaceObject.jsx("br", {}), "  ", /*#__PURE__*/jsx_runtime_namespaceObject.jsx("br", {}), /*#__PURE__*/jsx_runtime_namespaceObject.jsx("a", {
                  href: `${file[2]}`,
                  children: "Open File"
                }), "  "]
              })]
            }, index);
          })
        })]
      })]
    })
  });
};

Home.getInitialProps = async () => {
  var allFiles = [];
  const fileCount = await contract.methods.fileIndex().call();

  for (var i = fileCount; i > 0; i--) {
    const files = await contract.methods.Files(i).call();
    allFiles.push(files);
  }

  return {
    allFiles: allFiles
  };
};

/* harmony default export */ const pages = (Home);

/***/ }),

/***/ 297:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(859));
module.exports = __webpack_exports__;

})();