import * as vscode from 'vscode';
// import lang from './lang';
const mariadb = require('mariadb');
import vals from './consts';

const pool = mariadb.createPool({
    host: vals.host, port:vals.port,
    user: vals.user, password: vals.pass,
    connectionLimit: 5
});

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('uanalyzeri18n.uAnalyzeri18n', () => {
		// async function getMessageCode(msg:string, locale:string){
			
		// 	let conn, rows;
		// 	try{
		// 		conn = await pool.getConnection();
		// 		conn.query('USE analyzerlite');
		// 		let query = `select msg_cd, msg_val from nx_msg_dtl where mst_cd='label.language' and msg_val='${msg}' and locale_type='${locale}'`;
		// 		// console.log(query);
		// 		rows = await conn.query(query);
		// 	}
		// 	catch(err){
		// 		throw err;
		// 	}
		// 	finally{
		// 		if (conn) {
		// 			conn.end();
		// 		}
		// 		return rows[0];
		// 	}
		// }

		// async function getMessageCodeFromFile(msg:string, locale:string){
			
			
		// }

		// let editor = vscode.window.activeTextEditor;
		// if (!editor) {
		//   return vscode.window.showInformationMessage("선택된 Text가 없음.");
		// }
		// const selections = editor.selections[0];
		// const selectionRange = new vscode.Range(selections.start, selections.end);
		// const text = editor.document.getText(selectionRange);
	


		// getMessageCode(text, 'ko').then( row => {
		// 		if(row) {
		// 			//window.showInformationMessage(JSON.stringify(row));
		// 			editor!.edit((edited: vscode.TextEditorEdit) =>
		// 				edited.replace(
		// 				selectionRange,
		// 				`<span data-langnum="${row.msg_cd}">${row.msg_val}</span>`
		// 				)
		// 			);
		// 		} else {
		// 			vscode.window.showInformationMessage('데이터가 없습니다.');
		// 		}
		// 	}).catch(err => console.log(err));
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
