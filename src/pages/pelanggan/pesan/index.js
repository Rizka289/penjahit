import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, Button, View, Text, ScrollView, Image, TouchableOpacity } from "react-native"
import Wizard from "react-native-wizard"
import { logo } from "../../../assets"
import styles from "../../../utils/styles"
import Alert from '../../../components/atoms/Utils/Alert'
import KategoriModel from "./Kategori/model"
import KategoriBahan from "./Kategori/bahan"
import { FlatGrid } from "react-native-super-grid"
import PenjahitModel from "../../../models/Penjahit"
import { colors } from "../../../utils"
import Spinner from 'react-native-loading-spinner-overlay';

const FormPesan = ({ route, navigation }) => {
    const [loading, isLoading] = useState(false);
    const params = route.params;
    const wizard = useRef()
    const [message, setMessage] = useState(null);
    const [isFirstStep, setIsFirstStep] = useState(true)
    const [isLastStep, setIsLastStep] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    const [body, setBody] = useState({
        model: null,
        bahan: null,
        bahan_sendiri: true,
        penjahit: params.username
    });

    const sendData = async () => {
        isLoading(true);
        console.log("Body \n", body);
        const result = await PenjahitModel.buatPesanan(body)
        if (!result.success) {
            isLoading(false);
            setMessage(result.message)
        }
        else {
            setMessage(result.message);
            setTimeout(() => {
                navigation.replace('PofilePenjahit', params);
                isLoading(false);
            }, 5000)
        }
    }

    const stepList = [
        {
            content: <KategoriModel body={body} setBody={setBody} />,
        },
        {
            content: <KategoriBahan body={body} setBody={setBody} />,
        },
        {
            content: <View >
                <Text>Pilih salah satu</Text>
                <FlatGrid
                    itemDimension={130}
                    data={[
                        {
                            text: "Bawa bahan sendiri",
                            value: true
                        },
                        {
                            text: "Bahan dari penjahit",
                            value: false
                        },
                    ]}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => { setBody({ ...body, bahan_sendiri: item.value }) }} style={[{ ...local_style.itemContainer, ...styles.shadow }, { backgroundColor: body.bahan_sendiri == item.value ? '#6e3b6e' : '#f9c2ff' }]}>
                            <Text style={[local_style.itemName, { color: body.bahan_sendiri == item.value ? 'white' : 'black' }]}>{item.text}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>,
        },
    ]
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white' }}>
            <Spinner
                visible={loading}
                textContent={'Loading...'}
                textStyle={{ color: '#FFF' }}
            />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image source={logo} style={styles.wrapper.ilustration} />
                <Text style={styles.text.welcome}>Mau menjahit apa hari ini </Text>

                {params.portofolio.length == 0 ? <Alert text={"Penjahit ini belum melengkapi portofolionya"} style={'warning'} /> : null}
            </View>
            <View style={{ flexDirection: "column", marginVertical: 20, marginHorizontal: 30, flex: 1 }}>
                <Wizard
                    ref={wizard}
                    steps={stepList}
                    isFirstStep={val => setIsFirstStep(val)}
                    isLastStep={val => setIsLastStep(val)}
                    currentStep={({ currentStep, isLastStep, isFirstStep }) => {
                        setCurrentStep(currentStep)
                    }}
                />
            </View>
            {message != null ? <Text style={{ color: colors.danger, textAlign: 'center', marginBottom: 30 }}>{message}</Text> : null}
            <View
                style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    backgroundColor: "#FFF",
                    borderBottomColor: "#dedede",
                    borderBottomWidth: 1,
                    bottom: 0
                }}>

                <Button disabled={isFirstStep} title="Prev" onPress={() => wizard.current.prev()} />
                <Text>Step {currentStep + 1}</Text>
                <Button title={isLastStep ? "Pesan" : "Next"} onPress={() => {
                    if (!isLastStep) {
                        if (currentStep == 0 && body.model == null)
                            setMessage("Pilih Model dulu");
                        else if (currentStep == 1 && body.bahan == null)
                            setMessage("Pilih Bahan dulu");
                        else {
                            setMessage(null)
                            wizard.current.next()
                        }

                    } else {
                        sendData();
                    }
                }} />
            </View>
        </View>
    )
}

export default FormPesan;
const local_style = {
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        // height: 50,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
}