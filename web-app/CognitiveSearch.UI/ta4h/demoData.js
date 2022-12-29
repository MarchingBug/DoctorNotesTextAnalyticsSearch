function renderDemo1() {
    text = "All female participants that are premenopausal will be required to have a pregnancy test; any participant who is pregnant or breastfeeding will not be included.";
    ta4h = {
        "id": "demo",
        "entities": [
            {
                "offset": 4,
                "length": 6,
                "text": "female",
                "category": "Gender",
                "confidenceScore": 0.9995,
                "name": "Woman",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0043210"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000014451"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0018392"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000013181"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U005036"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85147274"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "4"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D014930"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "23450"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "Ua0Wg"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "E-4957"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "L-85B00"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "224526002"
                    }
                ]
            },
            {
                "offset": 33,
                "length": 13,
                "text": "premenopausal",
                "category": "Diagnosis",
                "confidenceScore": 0.9769,
                "name": "Premenopausal - menopausal status",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0279752"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000027286"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP140231-4"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C15491"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C15491"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000045268"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000040049"
                    }
                ]
            },
            {
                "offset": 74,
                "length": 14,
                "text": "pregnancy test",
                "category": "ExaminationName",
                "confidenceScore": 0.9962,
                "name": "Pregnancy Tests",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0032976"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000007532"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000010058"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "2403-5273"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "W33002"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP105252-3"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10036572"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "13078"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D011258"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C92949"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "X77WY"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "P-9501"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "P2-87010"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "74036000"
                    }
                ]
            },
            {
                "offset": 113,
                "length": 8,
                "text": "pregnant",
                "category": "Diagnosis",
                "confidenceScore": 0.9989,
                "name": "Patient currently pregnant",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0549206"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000023061"
                    },
                    {
                        "dataSource": "HL7V2.5",
                        "id": "B6"
                    },
                    {
                        "dataSource": "HL7V3.0",
                        "id": "PGNT"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA15173-0"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10018707"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "621"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C124295"
                    },
                    {
                        "dataSource": "NCI_CDISC",
                        "id": "C124295"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "621.."
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-31220"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-84000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "77386006"
                    }
                ]
            },
            {
                "offset": 125,
                "length": 13,
                "text": "breastfeeding",
                "category": "Diagnosis",
                "confidenceScore": 0.9965,
                "name": "Breastfeeding (mother)",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C1623040"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP114922-0"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "413712001"
                    }
                ]
            }
        ],
        "relations": [],
        "warnings": []
    }
    renderTextAnalyticsForHealth("demo1", text, ta4h);
}

function renderDemo2() {
    text = "Woman in NAD with a h/o CAD, DM2, asthma and HTN on altace for 8 years awoke from sleep around 2:30 am of a sore throat and swelling of tongue. She came immediately to the ED b/c she was having difficulty swallowing and some trouble breathing due to obstruction caused by the swelling. She has never had a similar reaction ever before and she did not have any associated SOB, chest pain, itching, or nausea. She has not noticed any rashes, and has been afebrile. In the ED she was given 25mg benadryl IV, 125 mg solumedrol IV and pepcid 20 mg IV.";
    ta4h = {
        "id": "demo",
        "entities": [
            {
                "offset": 0,
                "length": 5,
                "text": "Woman",
                "category": "Gender",
                "confidenceScore": 0.9999,
                "name": "Woman",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0043210"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000014451"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0018392"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000013181"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U005036"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85147274"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "4"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D014930"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "23450"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "Ua0Wg"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "E-4957"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "L-85B00"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "224526002"
                    }
                ]
            },
            {
                "offset": 9,
                "length": 3,
                "text": "NAD",
                "category": "Diagnosis",
                "confidenceScore": 0.9999,
                "name": "patient appears in no acute distress (physical finding)",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C2051415"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "10024"
                    }
                ]
            },
            {
                "offset": 24,
                "length": 3,
                "text": "CAD",
                "category": "Diagnosis",
                "confidenceScore": 0.9987,
                "name": "Coronary Artery Disease",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C1956346"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005327"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00010"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0037465"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "1393-3397"
                    },
                    {
                        "dataSource": "CST",
                        "id": "CORONARY ART DIS"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U000871"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0001677"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "I25.1"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU019520"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "K76003"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP90122-0"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10011078"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "35988"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "1276"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D003324"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C26732"
                    },
                    {
                        "dataSource": "NCI_CELLOSAURUS",
                        "id": "C26732"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C26732"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000439400"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU002067"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XE2uV"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "D3-13000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "414024009"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0426"
                    }
                ]
            },
            {
                "offset": 29,
                "length": 3,
                "text": "DM2",
                "category": "Diagnosis",
                "confidenceScore": 0.9996,
                "name": "Diabetes Mellitus, Non-Insulin-Dependent",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0011860"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00336"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0045504"
                    },
                    {
                        "dataSource": "CCSR_ICD10CM",
                        "id": "END005"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000003837"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "U000225"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "0862-7250"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U000472"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0005978"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "E11"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "E11"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "E11"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "T90"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU022755"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "T90007"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85092226"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA10552-0"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10067585"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "30480"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "5930"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D003924"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C26747"
                    },
                    {
                        "dataSource": "NCI_CELLOSAURUS",
                        "id": "C26747"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C26747"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C26747"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU047504"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "X40J5"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "D-241Y"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "DB-61030"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "44054006"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0371"
                    }
                ]
            },
            {
                "offset": 34,
                "length": 6,
                "text": "asthma",
                "category": "Diagnosis",
                "confidenceScore": 0.9979,
                "name": "Asthma",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0004096"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005951"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00009"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1017373"
                    },
                    {
                        "dataSource": "CCS",
                        "id": "8.3"
                    },
                    {
                        "dataSource": "CCSR_ICD10CM",
                        "id": "RSP009"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000001541"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "080"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "1525-2157"
                    },
                    {
                        "dataSource": "CST",
                        "id": "ASTHMA"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U000273"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0002099"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "J45.9"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "J45.9"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "J45"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "493"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "R96"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "R96"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU008836"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "R96001"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U000405"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85008860"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "MTHU020815"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10003553"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "32881"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "2"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D001249"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "493.9"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "01919"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C28397"
                    },
                    {
                        "dataSource": "NCI_CELLOSAURUS",
                        "id": "C28397"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1726"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C28397"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000440101"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C28397"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C28397"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU003537"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "04190"
                    },
                    {
                        "dataSource": "QMR",
                        "id": "R0121533"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "H33.."
                    },
                    {
                        "dataSource": "SNM",
                        "id": "D-4790"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "D2-51000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "195967001"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "1367"
                    }
                ]
            },
            {
                "offset": 45,
                "length": 3,
                "text": "HTN",
                "category": "Diagnosis",
                "confidenceScore": 0.9991,
                "name": "Hypertensive disease",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0020538"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000023317"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00001"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1017493"
                    },
                    {
                        "dataSource": "CCS",
                        "id": "7.1"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000015800"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "397"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "0571-5243"
                    },
                    {
                        "dataSource": "CST",
                        "id": "HYPERTENS"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U002034"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0000822"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "I10-I15.9"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "I10-I15.9"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "I10"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "997.91"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU035456"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "K85004"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U002317"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85063723"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA14293-7"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10020772"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "33288"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "34"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D006973"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "005"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "997.91"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00905"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NCI_CELLOSAURUS",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E13785"
                    },
                    {
                        "dataSource": "NCI_CTRP",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1908"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000458091"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C3117"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "060808"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU002068"
                    },
                    {
                        "dataSource": "PCDS",
                        "id": "PRB_11000.06"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000686951"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "23830"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XE0Ub"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-70700"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "D3-02000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "38341003"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0210"
                    }
                ]
            },
            {
                "offset": 52,
                "length": 6,
                "text": "altace",
                "category": "MedicationName",
                "confidenceScore": 0.9999,
                "name": "Altace",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0878061"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000045298"
                    },
                    {
                        "dataSource": "MMSL",
                        "id": "315"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D017257"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C29411"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000686948"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "x02tS"
                    },
                    {
                        "dataSource": "RXNORM",
                        "id": "262418"
                    }
                ]
            },
            {
                "offset": 63,
                "length": 7,
                "text": "8 years",
                "category": "Time",
                "confidenceScore": 0.9955
            },
            {
                "offset": 95,
                "length": 7,
                "text": "2:30 am",
                "category": "Time",
                "confidenceScore": 0.9854
            },
            {
                "offset": 108,
                "length": 11,
                "text": "sore throat",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9898,
                "name": "Sore Throat",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0242429"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00661"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0036874"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000024822"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "695"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "2139-2226"
                    },
                    {
                        "dataSource": "CST",
                        "id": "PHARYNGITIS"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U003750"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R07.0"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R07.0"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R07.0"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "784.1"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU041000"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "R21005"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA30867-8"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10043524"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "219"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "4748"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D010612"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "462"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C50747"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E13575"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "2396"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "000709"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "Xa9zW"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-51724"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "162397003"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0523"
                    }
                ]
            },
            {
                "offset": 124,
                "length": 18,
                "text": "swelling of tongue",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9743,
                "name": "Tongue swelling",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0236068"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000023674"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U004073"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "D20022"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10042727"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "205"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU073264"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "421262002"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "1485"
                    }
                ]
            },
            {
                "offset": 172,
                "length": 2,
                "text": "ED",
                "category": "CareEnvironment",
                "confidenceScore": 0.9989
            },
            {
                "offset": 194,
                "length": 21,
                "text": "difficulty swallowing",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9948,
                "name": "Deglutition Disorders",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0011168"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005507"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00239"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1014574"
                    },
                    {
                        "dataSource": "CCS",
                        "id": "9.12.2"
                    },
                    {
                        "dataSource": "CCSR_ICD10CM",
                        "id": "SYM005"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000003662"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "265"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "5000-0052"
                    },
                    {
                        "dataSource": "CST",
                        "id": "DYSPHAGIA"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U001012"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0002015"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R13"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R13"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R13.10"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "787.20"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU024378"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "D21004"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85036477"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "MTHU029874"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10013950"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "312702"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "1309"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D003680"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "787.20"
                    },
                    {
                        "dataSource": "MTHMST",
                        "id": "MT160004"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00412"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C2980"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E10621"
                    },
                    {
                        "dataSource": "NCI_CTRP",
                        "id": "C2980"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1815"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000044666"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C2980"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "211613"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU036443"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000524080"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "15654"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XM08J"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-61020"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "D5-30250"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "40739000"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0280"
                    }
                ]
            },
            {
                "offset": 225,
                "length": 17,
                "text": "trouble breathing",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9947,
                "name": "Dyspnea",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0013404"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005442"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00182"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1015304"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000004216"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "266"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "2596-2296"
                    },
                    {
                        "dataSource": "CST",
                        "id": "DYSPNEA"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U001014"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0002094"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AE",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AMAE",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R06.02"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "786.05"
                    },
                    {
                        "dataSource": "ICNP",
                        "id": "10029433"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "R02"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "R02"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU024507"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "R02007"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U001486"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85040344"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP115812-2"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10013968"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "115876"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "3077"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D004417"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "U000486"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00495"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_CDISC",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E13368"
                    },
                    {
                        "dataSource": "NCI_CTRP",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1816"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000046183"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "042109"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU037132"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000598319"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "15680"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XE0qq"
                    },
                    {
                        "dataSource": "RCDAE",
                        "id": "XE0qq"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-75040"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-20040"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "267036007"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0514"
                    }
                ]
            },
            {
                "offset": 250,
                "length": 11,
                "text": "obstruction",
                "category": "SymptomOrSign",
                "confidenceScore": 0.7454,
                "name": "Obstruction",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0028778"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000004470"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1002744"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000008870"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU053672"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U006537"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP222112-7"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10061876"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "U003467"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C3284"
                    },
                    {
                        "dataSource": "NCI_CDISC",
                        "id": "C3284"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "2422"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000044954"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C3284"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "X79q0"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "M-34000"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "M-34000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "26036001"
                    }
                ]
            },
            {
                "offset": 276,
                "length": 8,
                "text": "swelling",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9117,
                "name": "Swelling",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0038999"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000004456"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1000701"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000011957"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "715"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "A08"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "A08"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "A08003"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA22440-4"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10042674"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "1229"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C3399"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "2091"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "191325"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU067007"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "X76Eu"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "M-02570"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "M-02570"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "442672001"
                    }
                ]
            },
            {
                "offset": 314,
                "length": 8,
                "text": "reaction",
                "category": "SymptomOrSign",
                "confidenceScore": 0.7953,
                "name": "Reaction",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0443286"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "0019926"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000035297"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP73228-6"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C25637"
                    },
                    {
                        "dataSource": "NCI_CDISC",
                        "id": "SDTM-OETESTCD"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "2414"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C25637"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XC0B5"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "263851003"
                    }
                ]
            },
            {
                "offset": 371,
                "length": 3,
                "text": "SOB",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9961,
                "assertion": {
                    "certainty": "negative"
                },
                "name": "Dyspnea",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0013404"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005442"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00182"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1015304"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000004216"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "266"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "2596-2296"
                    },
                    {
                        "dataSource": "CST",
                        "id": "DYSPNEA"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U001014"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0002094"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AE",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10AMAE",
                        "id": "R06.0"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R06.02"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "786.05"
                    },
                    {
                        "dataSource": "ICNP",
                        "id": "10029433"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "R02"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "R02"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU024507"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "R02007"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U001486"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85040344"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP115812-2"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10013968"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "115876"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "3077"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D004417"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "U000486"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00495"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_CDISC",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E13368"
                    },
                    {
                        "dataSource": "NCI_CTRP",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1816"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000046183"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C2998"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "042109"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU037132"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000598319"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "15680"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XE0qq"
                    },
                    {
                        "dataSource": "RCDAE",
                        "id": "XE0qq"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-75040"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-20040"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "267036007"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0514"
                    }
                ]
            },
            {
                "offset": 376,
                "length": 10,
                "text": "chest pain",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9986,
                "assertion": {
                    "certainty": "negative"
                },
                "name": "Chest Pain",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0008031"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00012"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1017850"
                    },
                    {
                        "dataSource": "CCS",
                        "id": "7.2.5"
                    },
                    {
                        "dataSource": "CCSR_ICD10CM",
                        "id": "CIR012"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000002750"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "171"
                    },
                    {
                        "dataSource": "CST",
                        "id": "PAIN CHEST"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U000673"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0100749"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R07.4"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R07.4"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R07.9"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "786.50"
                    },
                    {
                        "dataSource": "ICF",
                        "id": "b28011"
                    },
                    {
                        "dataSource": "ICF-CY",
                        "id": "b28011"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "A11"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU059497"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "A11001"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U000942"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85023146"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP98885-4"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10008479"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "33722"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "4744"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D002637"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "172"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00204"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C38665"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1776"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000467223"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C38665"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "070014"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU025178"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "182.."
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-71400"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-37000"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "29857009"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0718"
                    }
                ]
            },
            {
                "offset": 388,
                "length": 7,
                "text": "itching",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9988,
                "assertion": {
                    "certainty": "negative"
                },
                "name": "Pruritus",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0033774"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005226"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00607"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1014802"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000010273"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "619"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "2716-6790"
                    },
                    {
                        "dataSource": "CST",
                        "id": "PRURITUS"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U003248"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0000989"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "L29.9"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "L29.9"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "L29.9"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "698.9"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "S02"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "S02"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU062220"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "S02007"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U003889"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85108048"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA20641-9"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10037087"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "1113"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "3067"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D011537"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "619"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "698.9"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "01266"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C3344"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E13686"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1943"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000446534"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C3344"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C3344"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "080316"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU037280"
                    },
                    {
                        "dataSource": "OMS",
                        "id": "26.06"
                    },
                    {
                        "dataSource": "PCDS",
                        "id": "PRB_17010.06"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000042504"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "41260"
                    },
                    {
                        "dataSource": "QMR",
                        "id": "Q0200232"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XM00q"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-82300"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-A2300"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "418290006"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0024"
                    }
                ]
            },
            {
                "offset": 400,
                "length": 6,
                "text": "nausea",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9968,
                "assertion": {
                    "certainty": "negative"
                },
                "name": "Nausea",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0027497"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000005505"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00280"
                    },
                    {
                        "dataSource": "CCC",
                        "id": "B04.1"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1014479"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000008525"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "508"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "1249-7728"
                    },
                    {
                        "dataSource": "CST",
                        "id": "NAUSEA"
                    },
                    {
                        "dataSource": "DXP",
                        "id": "U002745"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0002018"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R11.0"
                    },
                    {
                        "dataSource": "ICNP",
                        "id": "10000859"
                    },
                    {
                        "dataSource": "ICPC",
                        "id": "D09"
                    },
                    {
                        "dataSource": "ICPC2EENG",
                        "id": "D09"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU049523"
                    },
                    {
                        "dataSource": "ICPC2P",
                        "id": "D09002"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U003135"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85090324"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LP36327-2"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10028813"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "411"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D009325"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "00134"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C3258"
                    },
                    {
                        "dataSource": "NCI_CTCAE",
                        "id": "E10878"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "1970"
                    },
                    {
                        "dataSource": "NCI_NCI-GLOSS",
                        "id": "CDR0000390302"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C3258"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "040016"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU002455"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "33080"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "X75qw"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "F-61560"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-52760"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "422587007"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0308"
                    }
                ]
            },
            {
                "offset": 432,
                "length": 6,
                "text": "rashes",
                "category": "SymptomOrSign",
                "confidenceScore": 0.9951,
                "assertion": {
                    "certainty": "negative"
                },
                "name": "Exanthema",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0015230"
                    },
                    {
                        "dataSource": "AOD",
                        "id": "0000022958"
                    },
                    {
                        "dataSource": "BI",
                        "id": "BI00609"
                    },
                    {
                        "dataSource": "CCPSS",
                        "id": "1014681"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000029440"
                    },
                    {
                        "dataSource": "COSTAR",
                        "id": "638"
                    },
                    {
                        "dataSource": "CST",
                        "id": "RASH"
                    },
                    {
                        "dataSource": "HPO",
                        "id": "HP:0000988"
                    },
                    {
                        "dataSource": "ICD10",
                        "id": "R21"
                    },
                    {
                        "dataSource": "ICD10AM",
                        "id": "R21"
                    },
                    {
                        "dataSource": "ICD10CM",
                        "id": "R21"
                    },
                    {
                        "dataSource": "ICD9CM",
                        "id": "782.1"
                    },
                    {
                        "dataSource": "ICPC2ICD10ENG",
                        "id": "MTHU027334"
                    },
                    {
                        "dataSource": "LCH",
                        "id": "U001699"
                    },
                    {
                        "dataSource": "LCH_NW",
                        "id": "sh85046091"
                    },
                    {
                        "dataSource": "LNC",
                        "id": "LA29194-0"
                    },
                    {
                        "dataSource": "MDR",
                        "id": "10037844"
                    },
                    {
                        "dataSource": "MEDCIN",
                        "id": "273176"
                    },
                    {
                        "dataSource": "MEDLINEPLUS",
                        "id": "208"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D005076"
                    },
                    {
                        "dataSource": "MTH",
                        "id": "638"
                    },
                    {
                        "dataSource": "MTHICD9",
                        "id": "782.1"
                    },
                    {
                        "dataSource": "NANDA-I",
                        "id": "01533"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C111884"
                    },
                    {
                        "dataSource": "NCI_FDA",
                        "id": "2033"
                    },
                    {
                        "dataSource": "NCI_GDC",
                        "id": "C39594"
                    },
                    {
                        "dataSource": "NCI_NICHD",
                        "id": "C111884"
                    },
                    {
                        "dataSource": "NCI_caDSR",
                        "id": "C39594"
                    },
                    {
                        "dataSource": "NOC",
                        "id": "070301"
                    },
                    {
                        "dataSource": "OMIM",
                        "id": "MTHU047706"
                    },
                    {
                        "dataSource": "OMS",
                        "id": "26.02"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "XM07J"
                    },
                    {
                        "dataSource": "SNM",
                        "id": "M-48400"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "M-01710"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "271807003"
                    },
                    {
                        "dataSource": "WHO",
                        "id": "0028"
                    }
                ]
            },
            {
                "offset": 453,
                "length": 8,
                "text": "afebrile",
                "category": "SymptomOrSign",
                "confidenceScore": 0.987,
                "name": "Apyrexial",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0277797"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000027018"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "Xa1kS"
                    },
                    {
                        "dataSource": "SNMI",
                        "id": "F-03005"
                    },
                    {
                        "dataSource": "SNOMEDCT_US",
                        "id": "86699002"
                    }
                ]
            },
            {
                "offset": 470,
                "length": 2,
                "text": "ED",
                "category": "CareEnvironment",
                "confidenceScore": 0.9989
            },
            {
                "offset": 487,
                "length": 4,
                "text": "25mg",
                "category": "Dosage",
                "confidenceScore": 0.996
            },
            {
                "offset": 492,
                "length": 8,
                "text": "benadryl",
                "category": "MedicationName",
                "confidenceScore": 0.9998,
                "name": "Benadryl",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0700899"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000044903"
                    },
                    {
                        "dataSource": "MMSL",
                        "id": "899"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D004155"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C300"
                    },
                    {
                        "dataSource": "NCI_DTP",
                        "id": "NSC0033299"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000039163"
                    },
                    {
                        "dataSource": "PSY",
                        "id": "05760"
                    },
                    {
                        "dataSource": "RXNORM",
                        "id": "203457"
                    }
                ]
            },
            {
                "offset": 501,
                "length": 2,
                "text": "IV",
                "category": "MedicationRoute",
                "confidenceScore": 0.9992
            },
            {
                "offset": 505,
                "length": 6,
                "text": "125 mg",
                "category": "Dosage",
                "confidenceScore": 0.9944
            },
            {
                "offset": 512,
                "length": 10,
                "text": "solumedrol",
                "category": "MedicationName",
                "confidenceScore": 0.9999,
                "name": "Solu-Medrol",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0701466"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000045008"
                    },
                    {
                        "dataSource": "CSP",
                        "id": "0059-7979"
                    },
                    {
                        "dataSource": "MMSL",
                        "id": "1325"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D008776"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C48004"
                    },
                    {
                        "dataSource": "NCI_DTP",
                        "id": "NSC0048989"
                    },
                    {
                        "dataSource": "RXNORM",
                        "id": "203856"
                    }
                ]
            },
            {
                "offset": 523,
                "length": 2,
                "text": "IV",
                "category": "MedicationRoute",
                "confidenceScore": 0.9989
            },
            {
                "offset": 530,
                "length": 6,
                "text": "pepcid",
                "category": "MedicationName",
                "confidenceScore": 0.9997,
                "name": "Pepcid",
                "links": [
                    {
                        "dataSource": "UMLS",
                        "id": "C0678119"
                    },
                    {
                        "dataSource": "CHV",
                        "id": "0000042727"
                    },
                    {
                        "dataSource": "MMSL",
                        "id": "2232"
                    },
                    {
                        "dataSource": "MSH",
                        "id": "D015738"
                    },
                    {
                        "dataSource": "NCI",
                        "id": "C29045"
                    },
                    {
                        "dataSource": "PDQ",
                        "id": "CDR0000574268"
                    },
                    {
                        "dataSource": "RCD",
                        "id": "x02nB"
                    },
                    {
                        "dataSource": "RXNORM",
                        "id": "196458"
                    }
                ]
            },
            {
                "offset": 537,
                "length": 5,
                "text": "20 mg",
                "category": "Dosage",
                "confidenceScore": 0.999
            },
            {
                "offset": 543,
                "length": 2,
                "text": "IV",
                "category": "MedicationRoute",
                "confidenceScore": 0.9997
            }
        ],
        "relations": [
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/1",
                        "role": "Condition"
                    },
                    {
                        "ref": "#/documents/0/entities/7",
                        "role": "Time"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/2",
                        "role": "Condition"
                    },
                    {
                        "ref": "#/documents/0/entities/7",
                        "role": "Time"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/3",
                        "role": "Condition"
                    },
                    {
                        "ref": "#/documents/0/entities/7",
                        "role": "Time"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/4",
                        "role": "Condition"
                    },
                    {
                        "ref": "#/documents/0/entities/7",
                        "role": "Time"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/5",
                        "role": "Condition"
                    },
                    {
                        "ref": "#/documents/0/entities/7",
                        "role": "Time"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/8",
                        "role": "Time"
                    },
                    {
                        "ref": "#/documents/0/entities/9",
                        "role": "Condition"
                    }
                ]
            },
            {
                "relationType": "TimeOfCondition",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/8",
                        "role": "Time"
                    },
                    {
                        "ref": "#/documents/0/entities/10",
                        "role": "Condition"
                    }
                ]
            },
            {
                "relationType": "DosageOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/24",
                        "role": "Dosage"
                    },
                    {
                        "ref": "#/documents/0/entities/25",
                        "role": "Medication"
                    }
                ]
            },
            {
                "relationType": "RouteOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/25",
                        "role": "Medication"
                    },
                    {
                        "ref": "#/documents/0/entities/26",
                        "role": "Route"
                    }
                ]
            },
            {
                "relationType": "DosageOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/27",
                        "role": "Dosage"
                    },
                    {
                        "ref": "#/documents/0/entities/28",
                        "role": "Medication"
                    }
                ]
            },
            {
                "relationType": "RouteOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/28",
                        "role": "Medication"
                    },
                    {
                        "ref": "#/documents/0/entities/29",
                        "role": "Route"
                    }
                ]
            },
            {
                "relationType": "DosageOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/30",
                        "role": "Medication"
                    },
                    {
                        "ref": "#/documents/0/entities/31",
                        "role": "Dosage"
                    }
                ]
            },
            {
                "relationType": "RouteOfMedication",
                "entities": [
                    {
                        "ref": "#/documents/0/entities/30",
                        "role": "Medication"
                    },
                    {
                        "ref": "#/documents/0/entities/32",
                        "role": "Route"
                    }
                ]
            }
        ],
        "warnings": []
    }

    renderTextAnalyticsForHealth("demo2", text, ta4h);
}
