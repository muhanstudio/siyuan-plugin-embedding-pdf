import {
    Plugin,
    Menu,
    Protyle,
    fetchSyncPost
} from "siyuan";
import "@/index.scss";

export default class PluginSample extends Plugin {

    async onload() {

        this.protyleSlash = [{
            filter: ["Embedded display pdf", "嵌入显示pdf", "qrpdf"],
            html: `<div class="b3-list-item__first"><span class="b3-list-item__text">${this.i18n.insertEmoji}</span><span class="b3-list-item__meta">😊</span></div>`,
            id: "insertEmoji",
            async callback(protyle: Protyle) {
                let menu =  new Menu("")
                let pdfList = await fetchSyncPost("/api/search/searchAsset",{"k":".pdf","exts":[]})
                for (let pdfItem of pdfList.data){
                    menu.addItem({
                        label:pdfItem.hName,
                        click:()=>{
                            protyle.protyle.toolbar.range.deleteContents()
                            protyle.insert(`<iframe sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals" src="/plugins/siyuan-plugin-embedding-pdf/pdfReader/index.html?file=../../../${pdfItem.path}" data-src="" border="0" frameborder="no" framespacing="0" allowfullscreen="true" style="width: 835px; height: 413px;"></iframe>`,true);
                        }
                    })
                }
                let {x,y} = protyle.protyle.toolbar.range.getBoundingClientRect()
                menu.open({
                    x:x,
                    y:y,
                    w:1000,
                })
            }
        }];

        console.log(this.i18n.helloPlugin);
    }
}