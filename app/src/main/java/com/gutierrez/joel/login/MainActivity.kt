package com.gutierrez.joel.login

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxColors
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.material3.ElevatedButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.modifier.modifierLocalMapOf
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.LinkAnnotation
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lint.kotlin.metadata.Visibility
import com.gutierrez.joel.login.ui.theme.LoginTheme
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            LoginTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    Column (
                        modifier = Modifier.padding(innerPadding)
                    ){
                        val passwordVisibility = rememberSaveable { mutableStateOf(false) }
                        LoginScreen(
                            onLoginClick = { /* Implement login */ },
                            onGoogleLoginClick = { /* Implement Google login */ },
                            onAppleLoginClick = { /* Implement Apple login */ },
                            onSignUpClick = { /* Implement Sign Up */ },
                            onForgotPasswordClick = { /* Implement Forgot Password */ },
                            pwdVisibility = passwordVisibility,
                        )
                    }
                }
            }
        }
    }
}

@Composable
fun LoginScreen(
    onLoginClick: () -> Unit,
    onGoogleLoginClick: () -> Unit,
    onAppleLoginClick: () -> Unit,
    onSignUpClick: () -> Unit,
    onForgotPasswordClick: () -> Unit,
    pwdVisibility: MutableState<Boolean>
) {
    Surface(
        modifier = Modifier.fillMaxSize()
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(48.dp))
            Text(
                text = stringResource(R.string.login),
                style = MaterialTheme.typography.headlineLarge,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onSurface
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = stringResource(R.string.header_text),
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface,
                textAlign = TextAlign.Center)

            Spacer(modifier = Modifier.height(32.dp))

            //Email text field
            val email= remember {
                mutableStateOf("")
            }
            OutlinedTextField(
                value = email.value,
                onValueChange = {email.value=it},
                label = {Text(text="Email")},
                trailingIcon = {
                    Surface (
                        modifier = Modifier
                            .size(40.dp),
                        shape = CircleShape,
                        color=Color.White
                    ){
                        Box(
                            contentAlignment=Alignment.Center
                        ){
                            Icon(
                                imageVector= Icons.Default.Email,
                                contentDescription="Email icon",
                                tint=Color.Unspecified)
                        }

                    }
                },
                modifier= Modifier.fillMaxWidth(),
                singleLine = true,
                shape= RoundedCornerShape(100)
            )
            Spacer(modifier = Modifier.height(16.dp))

            //Password text field
            val password= remember{
                mutableStateOf("")
            }
            val visible= pwdVisibility.value
            val visualTransformation= if(pwdVisibility.value) VisualTransformation.None else
                PasswordVisualTransformation()
            OutlinedTextField(
                value = password.value,
                onValueChange = {password.value=it},
                label = {Text(text="Password")},
                visualTransformation=visualTransformation,
                trailingIcon = {
                    Surface (
                        modifier = Modifier
                            .size(40.dp),
                        shape = CircleShape,
                        color=Color.White
                    ){
                        Box(
                            contentAlignment=Alignment.Center
                        ){
                            IconButton(
                                onClick = {pwdVisibility.value=!visible},
                                modifier=Modifier.size(25.dp)
                                ) {
                                Icon(
                                    if (pwdVisibility.value){
                                        Icons.Filled.Visibility
                                    }else{
                                        Icons.Filled.VisibilityOff
                                    },
                                    contentDescription = null,
                                    tint = Color.Unspecified
                                )

                            }
                        }

                    }
                },
                modifier= Modifier.fillMaxWidth(),
                singleLine = true,
                shape= RoundedCornerShape(100)
            )
            Spacer(modifier = Modifier.height(16.dp))
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ){
                val checkedState= remember { mutableStateOf(false) }
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Checkbox(
                        checked = checkedState.value,
                        onCheckedChange={checkedState.value=it},
                        colors=CheckboxDefaults.colors(
                            uncheckedColor = MaterialTheme.colorScheme.onSurface,
                            checkmarkColor = MaterialTheme.colorScheme.onSurface
                        )
                    )
                    Text(
                        text = "Recuérdame",
                        style = MaterialTheme.typography.bodyMedium
                    )
                }
                ClickableText(
                    text = buildAnnotatedString {
                        withStyle(
                            style = SpanStyle(
                                color = Color.Green,
                                fontWeight= FontWeight.Bold,
                                textDecoration = TextDecoration.Underline
                            )
                        ){
                            append("¿Olvidaste tu contraseña?")
                        }
                    },
                    onClick = {onForgotPasswordClick()}
                )
            }
            Spacer(modifier = Modifier.height(32.dp))
            //Login button
            Button(
                onClick = onLoginClick,
                modifier = Modifier
                    .fillMaxWidth()
                    .height(48.dp),
                colors = ButtonDefaults.buttonColors(
                    containerColor = MaterialTheme.colorScheme.onPrimaryContainer,
                    contentColor = MaterialTheme.colorScheme.primaryContainer
                )
            ) {
                Text(
                    text="Login",
                    style = MaterialTheme.typography.labelLarge,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            Spacer(modifier = Modifier.height(32.dp))
            Text(
                text="Otras opciones de logueo",
                style = MaterialTheme.typography.labelMedium,
                fontWeight = FontWeight.Bold,
                fontSize = 16.sp

            )
            Spacer(modifier = Modifier.height(32.dp))

            //Social login buttons
            Row(
                modifier= Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ){
                ElevatedButton(
                    onClick = onGoogleLoginClick,
                    modifier = Modifier
                        .height(48.dp),
                    colors = ButtonDefaults.elevatedButtonColors(
                        containerColor = Color.White
                    )

                ) {
                    Icon(
                        painter = painterResource(id=R.drawable.cromo),
                        contentDescription = "google icon",
                        modifier = Modifier.size(24.dp),
                        tint = Color.Unspecified
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Text(
                        text="Google",
                        style=MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.Bold,
                        color=Color.Black,
                        fontSize = 16.sp
                    )

                }

                ElevatedButton(
                    onClick = onGoogleLoginClick,
                    modifier = Modifier
                        .height(48.dp),
                    colors = ButtonDefaults.elevatedButtonColors(
                        containerColor = Color.White
                    )

                ) {
                    Icon(
                        painter = painterResource(id=R.drawable.apple),
                        contentDescription = "Apple icon",
                        modifier = Modifier.size(24.dp),
                        tint = Color.Unspecified
                    )
                    Spacer(modifier = Modifier.width(16.dp))
                    Text(
                        text="Apple",
                        style=MaterialTheme.typography.labelLarge,
                        fontWeight = FontWeight.Bold,
                        color=Color.Black,
                        fontSize = 16.sp
                    )
                }
            }
            Spacer(modifier = Modifier.height(32.dp))
            //Sign Up
            val signUpText= buildAnnotatedString {
                withStyle(
                    style = SpanStyle(
                        color=MaterialTheme.colorScheme.onBackground
                    )
                ){
                    append("¿No tienes una cuenta aún?")
                }
                withStyle(
                    style = SpanStyle(
                        color=Color.Green,
                        fontWeight = FontWeight.Bold
                    )
                ){
                    append("Regístrate")
                }
            }
            ClickableText(
                text= signUpText,
                onClick = {onSignUpClick},
                modifier = Modifier.padding(4.dp)
                )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    LoginTheme {
        val passwordVisibility = rememberSaveable { mutableStateOf(false) }
        LoginScreen(
            onLoginClick = { /*TODO*/ },
            onGoogleLoginClick= { /*TODO*/ },
            onAppleLoginClick = { /*TODO*/ },
            onSignUpClick = { /*TODO*/ },
            onForgotPasswordClick = { /*TODO*/ },
            pwdVisibility = passwordVisibility
        )
    }
}
