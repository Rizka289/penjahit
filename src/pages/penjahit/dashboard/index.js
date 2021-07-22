import React, { useEffect, useState } from "react"
import { BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Spinner from "react-native-loading-spinner-overlay";
import { logo } from "../../../assets";
import Alert from "../../../components/atoms/Utils/Alert"
import Utils from "../../../components/atoms/Utils/func";
import Auth from "../../../models/Auth";
import Uihelper from "../../../models/Uihelper";
import { colors } from "../../../utils";
import styles from "../../../utils/styles";

const DashboardPenjahit = ({ navigation }) => {
    const [profile, setProfile] = useState({
        portofolio: {}
    });
    const [loading, isLoading] = useState(true);
    const [pesanan, setPesanan] = useState([]);
    
    const mapStatus = {
        'dipesan': 'Dipesan',
        'diterima': 'Pesanan Diterima',
        'dikerjakan': 'Pesanan sedang dikerjakan',
        'batal': 'Dibatalkan',
        'tolak': 'Ditolak', 
        'selesai': 'Selesai'
    }

    useEffect(async () => {
        const data = await Auth.loadData('_token_');
        const pesanan = await Uihelper.pesananBaru();
        // BackHandler.addEventListener('hardwareBackPress', async () => await Auth.mustLogin(navigation))
        BackHandler.addEventListener('hardwareBackPress', () => false)

        if (data == null)
            navigation.replace("Splash")
        setProfile({ ...profile, ...data });
        setPesanan(pesanan);
        isLoading(false);

    }, []);
    let elements = [
        <View key="nodata">
            <Text style={{textAlign: 'center', fontSize: 25, color: colors.info}}>Tidak Ada Data</Text>
        </View>
    ]
    if (pesanan.length > 0) {
        elements = [];
        pesanan.forEach(v => {
            elements.push(
                <TouchableOpacity onPress={() => navigation.navigate("DetailPesanan", { ...v, role: profile.role })} style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomColor: '#D8E3E7', borderBottomWidth: 2, height: 80, alignItems: 'center', marginBottom: 15, backgroundColor: '#D8E3E7', paddingHorizontal: 15, borderRadius: 15 }} key={v.id}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ width: 40, height: 40, borderRadius: 50, borderColor: '#E1E5EA', borderWidth: 1 }} source={{ uri: Utils.imagePath(v.poto) }} />
                        <View>
                            <Text style={{ marginLeft: 10, fontSize: 15, color: '#45526C' }}>{v.nama_lengkap}</Text>
                            <Text style={{ marginLeft: 10, fontSize: 12, color: colors.disable }}>{profile.role == 'penjahit' ? v.pemesan : v.penjahit}</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{ marginRight: 10, fontSize: 17, color: '#45526C' }}>{mapStatus[v.status]}</Text>
                        <Text style={{ marginRight: 10, fontSize: 12, color: '#45526C' }}>{v.dibuat.substr(0, 10)}</Text>
                    </View>
                </TouchableOpacity>
            )
        });

    }
    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            {Object.keys(profile.portofolio).length == 0 ? <Alert onPress={() => navigation.navigate("UpdatePortofolio", profile)} style={'warning'} text={"Lengkapi portofolio anda untuk memudahkan calon pelanggan anda"} /> : null}
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={logo} style={styles.wrapper.ilustration} />
            </View>
            <View style={{marginHorizontal: 15}}>
                <Text style={{ color: colors.disable, textAlign: 'center', fontSize: 20, marginVertical: 20 }}>Pesanan Baru</Text>
                <View>
                    {elements.map(v => v)}
                </View>
            </View>
        </ScrollView>
    );
}

const ViewDashboard = ({ }) => {
}
export default DashboardPenjahit;