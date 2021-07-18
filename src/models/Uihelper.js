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

    daftarPesanan: async (usr) => {
        let url = "https://penjahit.kamscodelab.tech/pesanan/" + usr.role + "?usr=" + Utils.replaceAll(usr.username, " ", "+");
        const res = await fetch(url).then(res => res.json()).then(res => res).catch((e) => console.log(e));
        console.log("RES \n", res);
        let output = {
            success: res.type == "success",
            data: {
                semua: [],
                selesai: []
            }
        }
        if(res.type == 'success'){
            Object.keys(res).forEach(k => {
                if(k == 'type')
                    return;

                output.data.semua.push(res[k])
                if(res[k].status == 'selesai')
                    output.data.selesai.push(res[k])
            })
            output.message = null

        }else
            output.message = res.message;

        return output;
    }

}

export default Uihelper;