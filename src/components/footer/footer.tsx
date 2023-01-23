import github from '../../assets/img/github.png';
import linkedin from '../../assets/img/linkedin.png';
import mail from '../../assets/img/mail.png';

export const Footer = () => {
    return (
        <div className="Footer">
            <p>Alberto Rocha Lopez 2023</p>
            <div className="Links">
                <a href="  " className="Links__github">
                    <img src={github} alt="github link" />
                </a>
                <a href="*" className="Links__linkedin">
                    <img src={linkedin} alt="linkedin" />
                </a>
                <a href="mailto:arochaldev@gmail.com" className="Links__mail">
                    <img src={mail} alt="mail" />
                </a>
            </div>
        </div>
    );
};
