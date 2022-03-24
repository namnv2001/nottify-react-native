import { StyleSheet, View, Text, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form'
import tw from 'twrnc'

import { emailPattern, passwordPattern } from 'patterns/index'
import CustomizeButton from 'components/CustomizeButton'
import AppLogo from 'components/AppLogo'
import Navigator from 'components/Navigator'

function Register({ navigation }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })
  const onSubmit = (data) => console.log(data)

  return (
    <KeyboardAwareScrollView style={tw`flex bg-black px-8 pt-8`}>
      <AppLogo />
      <View>
        {/* USERNAME */}
        <Text style={styles.span}>Username</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='username'
          rules={{
            required: 'Username is required',
          }}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}
        {/* EMAIL */}
        <Text style={styles.span}>Email</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='email'
          rules={{
            required: 'Email is required',
            pattern: { value: emailPattern, message: 'Wrong email validation' },
          }}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}
        {/* PASSWORD */}
        <Text style={styles.span}>Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='password'
          rules={{
            required: 'Password is required',
            pattern: {
              value: passwordPattern,
              message:
                'Password must contain at least eight characters, at least one letter and one number!',
            },
          }}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}
        {/* CONFIRM PASSWORD */}
        <Text style={styles.span}>Confirm Password</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name='confirmPassword'
          rules={{
            required: 'Confirm Password is required',
            pattern: {
              value: passwordPattern,
              message:
                'Password must contain at least eight characters, at least one letter and one number!',
            },
            validate: (value) =>
              value === watch('password') || 'Passwords must match',
          }}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword.message}</Text>
        )}
        <Navigator
          navigation={navigation}
          text='Already has an account? Go to'
          navigate='Login'
        />
        {/* SUBMIT_1 */}
        <CustomizeButton pressed={handleSubmit(onSubmit)} title='Register' />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  span: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    color: 'red',
  },
  input: {
    borderColor: 'white',
    color: 'white',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
  },
})

export default Register
