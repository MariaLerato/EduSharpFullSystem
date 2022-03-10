import React, { useState } from 'react'
import { View, Text,  StyleSheet, Dimensions, ScrollView, StatusBar } from 'react-native'
import { CheckBox } from 'react-native-elements';

const topPadding = Dimensions.get("screen").height * 0.1;
const Terms = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false)
    const Check = () => {
        setChecked(!isChecked)
        navigation.navigate('register')
    }
    return (
        <ScrollView style={styles.container}>
            <View style={styles.text}>

                <Text style={{ fontWeight: '500', fontSize: 25, padding: 4 }} >
                    Terms and Conditions
                </Text>
                    <Text style={{padding:2,marginTop:'-2%'}}>  Last updated: November 02, 2021</Text>

                <Text style={{ fontStyle: 'italic', padding: 2 }}> Please read these terms and conditions carefully before using Our Application.</Text>
                    <Text style={{fontWeight:'700'}}>
                    Interpretation and Definitions
                    </Text>
                    <Text style={{ padding: 2 }}>    
                    The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
                    Definitions
                    For the purposes of these Terms and Conditions:

                    Affiliate means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.

                    Country refers to: South Africa

                    Company (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to EduSharp.

                    Device means any device that can access the Service such as a computer, a cellphone or a digital tablet.

                    Service refers to the Mobile Application.

                    Terms and Conditions (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service. This Terms and Conditions agreement has been created with the help of the Terms and Conditions Generator.

                    Third-party Social Media Service means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.

                    Mobile Application refers to EduSharp, accessible from http://expo.edusharp

                    You means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.

                    Termination
                    We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions.

                    Upon termination, Your right to use the Service will cease immediately.

                    Limitation of Liability
                    Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.

                    To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.

                    Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party's liability will be limited to the greatest extent permitted by law.

                    "AS IS" and "AS AVAILABLE" Disclaimer
                    The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.

                    Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.

                    Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.

                    Governing Law
                    The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.
                    Contact Us
                    If you have any questions about these Terms and Conditions, You can contact us:
                    By email: edusharp@mlab.org
                </Text>
                <View style={{margin:8,padding:4,marginLeft:-4}}>
                    <CheckBox onPress={Check} title={'Accept Ts & Cs'} size={25} />
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        paddingTop: 4,
        marginTop: StatusBar.currentHeight,

    },
    text: {
        padding: 10,
    }
})
export default Terms