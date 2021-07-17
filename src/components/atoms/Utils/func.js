const Utils = {
    capitalize: (text, tipe = 'first') => {
        if (tipe != 'first') {
            var strings = text.split(' ');
            var text = [];

            strings.forEach(s => {
                text.push(s.charAt(0).toUpperCase() + s.slice(1));
            });
            return text.join(' ');
        }
        else
            return this.charAt(0).toUpperCase() + this.slice(1);

    },
    replaceAll: (text, awal, baru) => text.split(awal).join(baru),
    rupiahFormat: (angka) => {
        var number_string = angka.toString(),
            sisa = number_string.length % 3,
            rupiah = number_string.substr(0, sisa),
            ribuan = number_string.substr(sisa).match(/\d{3}/g);

        if (ribuan) {
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.') + ',00';
        }
        return rupiah;
    }
}

export default Utils;