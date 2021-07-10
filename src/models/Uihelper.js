const Uihelper = {
    getWilayah: async (id = null, level = null) => {
        let url = "http://penjahit.kamscodelab.tech/uihelper/getwilayah";
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

}

export default Uihelper;