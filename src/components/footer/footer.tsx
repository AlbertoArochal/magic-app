export const Footer = () => {
    return (
        <div className="Footer">
            <p>Alberto Rocha Lopez 2023</p>
            <div className="Links">
                <a
                    href="https://github.com/AlbertoArochal"
                    className="Links__github"
                >
                    <img src="../src/assets/img/github.png" alt="github link" />
                </a>
                <a href="*" className="Links__linkedin">
                    <img src="../src/assets/img/linkedin.png" alt="" />
                </a>
                <a href="mailto:arochaldev@gmail.com" className="Links__mail">
                    <img src="../src/assets/img/mail.png" alt="" />
                </a>
            </div>
        </div>
    );
};
