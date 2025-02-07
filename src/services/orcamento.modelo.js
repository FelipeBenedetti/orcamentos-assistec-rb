import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 4 },
  table: { display: "flex", flexDirection: "column", marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #000", padding: 5 },
  col: { width: "50%", fontSize: 12 }
});

const BudgetPDF = ({ clientName, products }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Orçamento</Text>
        <Text style={styles.text}>Cliente: {clientName}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.col}>Produto</Text>
          <Text style={styles.col}>Preço</Text>
        </View>
        {products.map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.col}>{item.name}</Text>
            <Text style={styles.col}>R$ {item.price.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default BudgetPDF;
