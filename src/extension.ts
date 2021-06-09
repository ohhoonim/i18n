import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "uanalyzeri18n.uAnalyzeri18n",
    () => {
      console.log("running extension...");
      const langPath =
        vscode.workspace.getConfiguration("uanalyzeri18n")["langPath"];
      const locale =
        vscode.workspace.getConfiguration("uanalyzeri18n")["locale"];
      const format =
        vscode.workspace.getConfiguration("uanalyzeri18n")["format"];

      function getMessageCodeFromFile(msg: string, locale: string) {
        const langs = require(langPath);
        let text = getKeyByValue(langs[locale], msg);

        return text.key ? text : null;
      }

      function getKeyByValue(langLocale: any, msg: string): any {
        let key = Object.keys(langLocale).find(
          (key) => langLocale[key] === msg
        );
        return { key: key, value: msg };
      }

      const editor = vscode.window.activeTextEditor!;
      const selections = editor.selections;

      vscode.window.activeTextEditor!.edit((edited: vscode.TextEditorEdit) => {
        selections.forEach((sel) => {
          let selectionRange = new vscode.Range(sel.start, sel.end);
          let text = editor.document.getText(selectionRange);
          let multiLang = getMessageCodeFromFile(text, locale);
          if (multiLang !== null && multiLang.value !== "") {
            let replaced = format
              .replace("${multiLang.key}", multiLang.key)
              .replace("${multiLang.value}", multiLang.value);
            edited.replace(
              sel,
              replaced
              //`<span data-langnum="${multiLang.key}">${multiLang.value}</span>`
            );
          } else {
            vscode.window.showInformationMessage("등록된 메시지가 없습니다");
          }
        });
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
