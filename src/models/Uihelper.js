import { data } from "browserslist";
import Utils from "../components/atoms/Utils/func";
const Uihelper = {
    getWilayah: async (id = null, level = null) => {
        let url = "https://penjahit.kamscodelab.tech/uihelper/getwilayah";
        if(id == null)
            url += "?id="
        else
            url += '?id=' + id;

        if(url == null)
            url += "&level="
        else
            url += '&level=' + level;
        const res = await fetch(url).then(res => res.json()).then(res => res).catch((e) => console.log(e));
        return res;
    },

    daftarPesanan: async (username) => {
        let url = "https://penjahit.kamscodelab.tech/pesanan?t=pelanggan&usr=" + Utils.replaceAll(username, " ", "_");
        const res = await fetch(url).then(res => res.json()).then(res => res).catch((e) => console.log(e));
        let output = {
            success: res.type == "success",
            message: res.message,
            data: {
                semua: [],
                selesai: []
            }
        }
        if(res.type == 'seccess'){
            Object.keys(res).forEach(k => {
                output.data.semua.push(res[k])
                if(res[k].status == 'selesai')
                    output.data.selesai.push(res[k])
            })

        }
        return output;
    }

}

export default Uihelper;