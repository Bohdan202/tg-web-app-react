import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css";
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [subject, setSubject] = useState('Забрати в магазині');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            street,
            houseNumber,
            subject
        }
        tg.sendData(JSON.stringify(data));
    }, [street, houseNumber, subject])

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

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
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
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'getAtStore'}>Забрати в магазині</option>
                <option value={'delivery'}>Доставка додому</option>
            </select>
        </div>
    );
};

export default Form;