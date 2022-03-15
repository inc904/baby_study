{
    userAddressList.map(item => {
        return (
            < View
        className = "address-item"
        key = {item.user_address_id} >
            < View
        className = "desc-wrap" >
            < View
        className = "user" >
            < Text
        className = "username" >
            {item.user_address_contact}
            < /Text>
            < Text
        className = "telephone" >
            {item.user_address_phone}
            < /Text>
            < /View>
            < View
        className = "address-desc" >
            {
                item.user_address_default === 1 && (
                    < Text className = "default-badge" > 默认 < /Text>
    )
    }

    <
        Text
        className = "" >
            {item.user_address_area + item.user_address_address}
            < /Text>
            < /View>
            < /View>
            < View
        className = "edit-btn"
        onClick = {()
    =>
        {
            // 跳转到 编辑收获地址页面
            Taro.navigateTo({
                url: `/packageUser/pages/receiveAddress/editAddress/index?title=编辑收货地址&id=${item.user_address_id}`
            })
        }
    }
    >
    <
        View
        className = "fa fa-bianjibi" > < /View>
            < /View>
            < /View>
    )
    })
}