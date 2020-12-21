function doGet(e) {
    Logger.log( Utilities.jsonStringify(e) );
    if (!e.parameter.page) {
        return HtmlService.createTemplateFromFile('index1').evaluate();
    }
    return HtmlService.createTemplateFromFile(e.parameter['page']).evaluate();
}

function getScriptUrl() {
    var url = ScriptApp.getService().getUrl();
    return url;
}




/**
 * function doGet() { return HtmlService.createTemplateFromFile('Task 2,3,4(header footer table)').evaluate(); }
 * 
 * GASで公開したWebアプリは原則、ページ冒頭に「このアプリケーションは、Googleではなく、別のユーザーによって作成されたものです。」
 * と表示されてしまいます。
 * 同メッセージのスクリーンショットを下記リンク先のドライブに格納いたしましたのでご確認ください。
 * https://drive.google.com/drive/folders/1zlm_qX-YgjYjHy-RCfkVEaiXzSVrUfvF
 * ただ、この表示されない条件があり、GSuiteアカウントで公開して、公開時に「同ドメインのアカウントのみ」アクセス可能とすると
 * この表示はなくなります。
 * そのため、社内（ドメイン内）で利用する分には問題はないですが、
 * 全世界公開する場合はレイアウトがイマイチになってしまう点はご注意ください。
 */