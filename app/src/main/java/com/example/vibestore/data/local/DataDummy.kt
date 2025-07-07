package com.example.vibestore.data.local

import androidx.compose.ui.graphics.Color
import com.example.vibestore.R
import com.example.vibestore.data.local.entity.UserLocation
import com.example.vibestore.model.Coupon
import com.example.vibestore.model.PaymentMethod
import com.example.vibestore.model.Shipping

object DataDummy {
    val dummyUserLocation = listOf(
        UserLocation(
            id = 1,
            name = "Francys",
            address = "Av. Las perdices 143 " +
                    "Santa Anita " +
                    "Lima"
        ),
        UserLocation(
            id = 2,
            name = "Franco",
            address = "Calle Emilio Althaus 1542 " +
                    "Lince" +
                    "Lima"
        ),
    )
    val dummyShipping = listOf(
        Shipping(
            name = "REG",
            price = 13.00,
            description = "Tiempo estimado de llegada 2 - 3 días"
        ),
        Shipping(
            name = "OKE",
            price = 15.00,
            description = "Tiempo estimado de llegada 1 - 2 días"
        ),
        Shipping(
            name = "YES",
            price = 10.00,
            description = "Tiempo estimado de llegada 1 - 2 días"
        )
    )
    val dummyPaymentMethod = listOf(
        PaymentMethod(
            icon = R.drawable.icon_discover,
            name = "Discover"
        ),
        PaymentMethod(
            icon = R.drawable.icon_master_card,
            name = "Master Card"
        ),
        PaymentMethod(
            icon = R.drawable.icon_paypal,
            name = "Paypal"
        ),
        PaymentMethod(
            icon = R.drawable.icon_visa,
            name = "Visa"
        ),
    )
    val dummyCoupon = listOf(
        Coupon(
            discountedPrice = "Envío Gratis",
            description = "Aplica para obtener envío gratis",
            expiredDate = "31 Diciembre 2025",
            color1 = Color(0xFF9733EE),
            color2 = Color(0xFFDA22FF),
            couponCode = "HuSK4R428"
        ),
        Coupon(
            discountedPrice = "25%",
            description = "Aplica para obtener envío gratis",
            expiredDate = "31 Diciembre  2025",
            color1 = Color(0xFFFFA726),
            color2 = Color(0xFFFFD54F),
            couponCode = "TuSK4R768"
        ),
        Coupon(
            discountedPrice = "50%",
            couponCode = "3N1GM4765",
            description = "Aplica para obtener envío gratis",
            expiredDate = "31 Diciembre 2025",
            color1 = Color(0xFF00C9FF),
            color2 = Color(0xFF92FE9D)
        )
    )
}