import "../../styles/components/nav/Footer.scss";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
    return (
        <div className="footer d-flex flex-column justify-content-center align-items-center">
            <p style={{ marginBottom: "30px" }}>
                © 2023 All rights reserved by YoungLeeHan Korean
            </p>
            <div class="dropup-center dropup">
                <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ padding: "5px 15px", fontSize: "14px" }}
                >
                    Who made this?
                </button>
                <ul class="dropdown-menu">
                    <li>
                        <a
                            class="dropdown-item"
                            href="https://www.linkedin.com/in/danbi-choi/"
                            target="_blank"
                        >
                            👩‍💻 Danbi Choi
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            href="https://www.linkedin.com/in/youngsong01/"
                            target="_blank"
                        >
                            👩‍💻 Young Song
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            href="https://www.linkedin.com/in/younghyun-lee-yhl/"
                            target="_blank"
                        >
                            👩‍💻 Younghyun Lee
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            href="https://www.linkedin.com/in/katieisinseattle/"
                            target="_blank"
                        >
                            👩‍💻 Katie Park
                        </a>
                    </li>
                    <li>
                        <a
                            class="dropdown-item"
                            href="https://www.linkedin.com/in/hykim-may/"
                            target="_blank"
                        >
                            👩‍💻 May Kim
                        </a>
                    </li>
                </ul>
            </div>
            <a
                href="https://github.com/YoungLeeHan/YoungleehanKorean"
                target="_blank"
            >
                <BsGithub
                    size={"30px"}
                    fill="#FFF"
                    style={{ marginTop: "30px" }}
                />
            </a>
        </div>
    );
}
