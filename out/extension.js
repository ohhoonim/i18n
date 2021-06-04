"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
//import lang from './lang';
const mariadb = require('mariadb');
const consts_1 = require("./consts");
const pool = mariadb.createPool({
    host: consts_1.default.host, port: consts_1.default.port,
    user: consts_1.default.user, password: consts_1.default.pass,
    connectionLimit: 5
});
function activate(context) {
    let disposable = vscode.commands.registerCommand('uanalyzeri18n.helloWorld', () => {
        function getMessageCode(msg, locale) {
            return __awaiter(this, void 0, void 0, function* () {
                let conn, rows;
                try {
                    conn = yield pool.getConnection();
                    conn.query('USE analyzerlite');
                    let query = `select msg_cd, msg_val from nx_msg_dtl where mst_cd='label.language' and msg_val='${msg}' and locale_type='${locale}'`;
                    // console.log(query);
                    rows = yield conn.query(query);
                }
                catch (err) {
                    throw err;
                }
                finally {
                    if (conn) {
                        conn.end();
                    }
                    return rows[0];
                }
            });
        }
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            return vscode.window.showInformationMessage("선택된 Text가 없음.");
        }
        const selections = editor.selections[0];
        const selectionRange = new vscode.Range(selections.start, selections.end);
        const text = editor.document.getText(selectionRange);
        getMessageCode(text, 'ko').then(row => {
            if (row) {
                //window.showInformationMessage(JSON.stringify(row));
                editor.edit((edited) => edited.replace(selectionRange, `<span data-langnum="${row.msg_cd}">${row.msg_val}</span>`));
            }
            else {
                vscode.window.showInformationMessage('데이터가 없습니다.');
            }
        }).catch(err => console.log(err));
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map