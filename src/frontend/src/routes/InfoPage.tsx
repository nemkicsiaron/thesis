import {Link} from "react-router-dom"
import {Button} from "reactstrap"
import "./styles/Info.scss"

const InfoPage = () => {
    return (
        <div className="main-page">
            <span>
                <h1>Info</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In itaque quod quo, quia vero iste commodi id magnam esse quos. Ducimus, dolor dignissimos? Nemo maxime quibusdam ullam. Asperiores, provident a.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor hic repudiandae deleniti exercitationem incidunt explicabo at earum, cumque consequuntur sequi fugit autem reiciendis deserunt eos voluptatibus, temporibus architecto. Nam, veniam!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos rem velit totam, veritatis animi a voluptatum reiciendis. Aspernatur asperiores id nulla vitae minus, dolorem, odio dolores sint molestiae provident optio.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quisquam? Doloribus quia sequi, vitae tempora, assumenda, similique alias quas hic ducimus non quidem quos accusamus id autem minima! Nostrum, minima.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis est quibusdam hic totam vel quas error aperiam. Ea iste, eum deleniti doloremque molestiae tenetur impedit? Voluptatem autem corporis quia aliquid.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ducimus possimus distinctio, vel laborum, ad commodi numquam delectus voluptates animi, alias rerum. Nihil reprehenderit necessitatibus eaque voluptates eius a ipsam!
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sapiente expedita error perferendis corrupti dolorem ab iste saepe distinctio, harum voluptatum quibusdam doloremque asperiores fugit nulla quam totam ipsum cupiditate.
                </p>
            </span>
            <Button type="button" className="btn list-btn" color="danger" size="lg" tag={Link} to="/">Vissza a főoldalra</Button>
        </div>
    );
};

export default InfoPage;