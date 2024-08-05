const ModalWindow = ({children, title}) => {
    return (
        <div>
            <div>
                <h2>
                    {title}
                </h2>
                {children}
            </div>
        </div>
    )
};

export default ModalWindow;