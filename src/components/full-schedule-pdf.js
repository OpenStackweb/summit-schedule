/**
 * Copyright 2020 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {

    },
    main: {
        margin: 10,
        padding: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: '5mm'
    },
    groupTitle: {
        fontSize: 16,
        marginTop: '3mm',
        marginBottom: '2mm'
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "25%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderColor: '#bfbfbf',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    }
});

// Create Document Component
const FullSchedulePDF = ({groupedEvents}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.main}>
                <Text style={styles.title}>Full Schedule</Text>
                {groupedEvents.map(group =>
                    <View style={styles.groupSection} key={`group-${group.value}`}>
                        <Text style={styles.groupTitle}>{group.label}</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Time</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Event</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Room</Text>
                                </View>
                                <View style={styles.tableColHeader}>
                                    <Text style={styles.tableCellHeader}>Rsvp</Text>
                                </View>
                            </View>
                            {group.events.map(ev =>
                                <View style={styles.tableRow} key={`ev-${ev.id}`}>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{`${ev.start_time} - ${ev.end_time}`}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{ev.title}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{ev.location_nice}</Text>
                                    </View>
                                    <View style={styles.tableCol}>
                                        <Text style={styles.tableCell}>{ev.rsvp ? 'RSVP' : ''}</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                )}
            </View>
        </Page>
    </Document>
);

export default FullSchedulePDF;