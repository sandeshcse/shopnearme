$icons = @{
    "visa" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/visa.png"
    "mastercard" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/mastercard.png"
    "paypal" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/paypal.png"
    "amex" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/amex.png"
    "visa-electron" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/visa-electron.png"
    "apple-pay" = "https://raw.githubusercontent.com/kristiyanpetrov/Paymentwall-test-task/master/src/assets/img/apple-pay.png"
}

# Create scripts directory if it doesn't exist
New-Item -ItemType Directory -Force -Path "public"

foreach ($icon in $icons.GetEnumerator()) {
    $outputPath = "public/$($icon.Key).png"
    Write-Host "Downloading $($icon.Key) to $outputPath"
    Invoke-WebRequest -Uri $icon.Value -OutFile $outputPath
} 