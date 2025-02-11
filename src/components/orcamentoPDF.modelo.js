// OrcamentoPDF.js
import React from "react";
import { Image, Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import logo from '../assets/logoAssistec.png'
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12
  },
  headerImage: {
    width: 200,           // Ajuste a largura conforme necessário
    height: 75,           // Ajuste a altura conforme necessário
    marginBottom: 10,
    alignSelf: "center"   // Centraliza a imagem
  },
  headerLogo: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center"
  },
  text: {
    marginBottom: 5
  },
  section: {
    marginBottom: 10
  }
});

const OrcamentoPDF = ({ orcamento }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image style={styles.headerImage} src={logo} />
      <Text style={styles.headerLogo}>Assistec Informática</Text>
      <Text style={styles.header}>Detalhes do Orçamento</Text>

      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>ID: </Text>
          {orcamento.id}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Cliente: </Text>
          {orcamento.cliente}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Data: </Text>
          {orcamento.data_criacao
            ? new Date(orcamento.data_criacao).toLocaleDateString()
            : "Data não disponível"}
        </Text>
      </View>

      <Text style={styles.title}>Componentes</Text>
      <View style={styles.section}>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Processador: </Text>
          {orcamento.componentes?.processador?.modelo}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Placa Mãe: </Text>
          {orcamento.componentes?.placaMae?.modelo}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Memória Ram: </Text>
          {orcamento.componentes?.memoriaRam?.modelo}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Armazenamento: </Text>
          {orcamento.componentes?.armazenamento?.modelo}
        </Text>
        <Text style={styles.text}>
          <Text style={{ fontWeight: "bold" }}>Gabinete: </Text>
          {orcamento.componentes?.gabinete?.modelo}
        </Text>
      </View>

      <Text style={styles.title}>Produtos Adicionais</Text>
      <View style={styles.section}>
        {orcamento.produtos_adicionais &&
          orcamento.produtos_adicionais.length > 0 ? (
          orcamento.produtos_adicionais.map((prod, index) => (
            <Text key={index} style={styles.text}>
              {prod?.nome || "Nome desconhecido"}
            </Text>
          ))
        ) : (
          <Text style={styles.text}>Nenhum produto adicional.</Text>
        )}
      </View>

      <Text style={styles.header}>
        Total: R$ {orcamento.valor_final?.toFixed(2) || "0.00"}
      </Text>
    </Page>
  </Document>
);

export default OrcamentoPDF;
