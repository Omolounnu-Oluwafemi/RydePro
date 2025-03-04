import React, {useState} from 'react';
import passwordApi from './../../../api/auth'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ActivityIndicator, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '../../../components/BackButton';
import InputField from '../../../components/InputField';
import StyledButton from '../../../components/StyledButton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    password: yup.string()
    .required()
    .min(8)
    .test('uppercase', 'Password must contain a Uppercase', value =>
      /^(?=.*[A-Z]).+$/.test(value),
    )
    .test('lowercase', 'Password must contain a Lowercase', value =>
      /^(?=.*[a-z]).+$/.test(value),
    )
    .test('number', 'Password must contain a Number', value =>
      /^(?=.*\d).+$/.test(value),
    )
    .test(
      'non-alphabet',
      'Password must contain a Non-alphabet character',
      value => /^(?=.*[^a-zA-Z0-9]).+$/.test(value),
    )
    .label('Password'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required()
    .label('Confirm Password'),
  });

export default function SetPassword({navigation, route}) {
    const { email } = route.params;
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values, {resetForm}) => {
      setLoading(true);
      const response = await passwordApi.setPassword(email, values.password);
      console.log(response.data.message);
      Keyboard.dismiss();
      if (!response.ok) {
        setLoading(false);
        return setErrorMessage(response.data.message);
      }
      setLoading(false);
      resetForm();
      navigation.navigate('UserDetails', { 
        email: email,
      });
      Alert.alert(response.data.message);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.titleContainer}> 
                <BackButton style={styles.Icon} />
                <Text style={styles.title}>Password</Text>
            </View>
            <Text style={styles.subtitle}>Your Password must be at least 8 characters long, and contain at least one digit and one special character</Text>
            
            <Formik
                initialValues={{ password: '', confirmPassword: '', }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
              <InputField
                label="Password"
                placeholder=""
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                errorMessage={errors.password}
                showPasswordToggle={true}
              />

              <InputField
                label="Confirm Password"
                placeholder=""
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="next"
                width="100%"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                showPasswordToggle={true}
              />

              <StyledButton
                title='Confirm'
                loading={loading}
                onPress={handleSubmit}
                width="100%"
                height={53}
                paddingVertical={10}
                marginTop={40}
                backgroundColor="#212121"
                borderWidth={2}
                TextColor="#fff"
                iconName="angle-right" 
                />
              </>
            )}
      </Formik>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%',
    },
    titleContainer: {
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginLeft: '30%',
    },
    subtitle: {
        fontSize: 16,
        color: '#464646',
        marginTop: 10,
        marginBottom: 15,
    },
});