import React, { useEffect, useState } from 'react'
import {Button, Icon, Image, Confirm} from "semantic-ui-react"
import {ProfileForm} from "../FormProfile"
import {Modal} from "../../../shared"
import {useAuth} from "../../../../hooks"
import { ENV } from '../../../../utils'
import {User} from "../../../../api"
import "./Profile.scss"

const userController = new User();

export function Profile(props) {
    const {onReload, reload} = props;
    const {accessToken, logout} = useAuth();

    const [user, setUser] = useState(null);

    //MODAL
    const [showModal, setShowModal] = useState(false);
    //CONFIRM
    const [showConfirm, setShowConfirm] = useState(false);

    //ABRIR/CERRAR MODAL
    const onOpenCloseModal = () => setShowModal((prevState) => !prevState);
    //ABRIR/CERRAR CONFIRM
    const onOpenCloseConfirm = () => setShowConfirm((prevState) => !prevState);

    useEffect(() => {
        (async() => {
            try {
                setUser(null);
                const response = await userController.getMe(accessToken);
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [reload]);

    //FUNCION ELIMINAR CUENTA
    const onDelete = async() => {
        try {
            await userController.deleteUser(accessToken, user._id);
            onReload();
            logout();
        } catch (error) {
            console.error(error);
        }
    }
    
  return (
    <div className='profile'>
        <div className='profile-box'>
            <div className='profile-box__image'>
                {user?.avatar && (
                <Image avatar size='small' src={`${ENV.BASE_PATH}/${user.avatar}`} />
                )}
            </div>


            <div className='profile-box__content'>
                <h1>{user?.username}</h1>


                <div className='box-buttons'>
                    <div className='profile-box__buttons'>
                        <Button basic color='black' onClick={onOpenCloseModal}>
                            <Icon name='edit' />
                            Editar
                        </Button>
                        <Button basic color='orange' onClick={onOpenCloseConfirm}>
                            <Icon name='user delete' />
                            Eliminar perfil
                        </Button>
                    </div>
                </div>
                
            </div>
        </div>

        <Modal
            show={showModal}
            close={onOpenCloseModal}
            title="Editar perfil"
            size="small">
                <ProfileForm profile={user} close={onOpenCloseModal} onReload={onReload}/>
        </Modal>

        <Confirm
            open={showConfirm}
            onCancel={onOpenCloseConfirm}
            onConfirm={onDelete}
            content="¿Está seguro que dese eliminar su cuenta?"
            size='mini'
        />

    </div>
  )
}
