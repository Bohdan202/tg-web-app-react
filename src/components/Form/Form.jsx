import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [delivery, setDelivery] = useState('Забрати в магазині');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            street,
            houseNumber,
            delivery
        }
        tg.sendData(JSON.stringify(data));
        console.log(data);
    }, [street, houseNumber, delivery]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Відправити дані'
        });
    }, []);


    useEffect(() => {
        if(!street || !houseNumber) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [street, houseNumber]);


    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }

    const onChangeHouseNumber = (e) => {
        setHouseNumber(e.target.value)
    }

    const onChangeDelivery = (e) => {
        setDelivery(e.target.value)
    }

    return (
        <div className={'form'}>
            <h3>Введіть ваші дані</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Вулиця/Мікрорайон'}
                value={street}
                onChange={onChangeStreet}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Номер будинку'}
                value={houseNumber}
                onChange={onChangeHouseNumber}
            />
            <select value={delivery} onChange={onChangeDelivery} className={'select'}>
                <option value={'getAtStore'}>Забрати в магазині</option>
                <option value={'deliveryToHome'}>Доставка додому</option>
            </select>
        </div>
    );
};

export default Form;