import styled from 'styled-components'

export const AuthContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: calc(100vh - 56px);
    background-color: #f1f1f1;
    background-image: url('./../../public/home.jpeg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    .Auth-form {
        width: 420px;
        box-shadow: rgb(0 0 0 / 16%) 1px 1px 10px;
        padding: 2rem 1rem;
        border-radius: 8px;
        background-color: #ffffffd4;
        margin: 1rem;
        .Auth-form-content {
        padding-left: 12%;
        padding-right: 12%;
        .Auth-form-title {
            text-align: center;
            margin-bottom: 1em;
            font-size: 24px;
            color: rgb(34, 34, 34);
            font-weight: 800;
        }
        label {
            font-size: 14px;
            font-weight: 600;
            color: rgb(34, 34, 34);
        }
        }
    }
`