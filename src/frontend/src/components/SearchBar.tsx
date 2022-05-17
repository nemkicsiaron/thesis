import React from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input } from "reactstrap";
import { listAllCategories } from "./services/CategoryServices";

const SearchBar = () => {
    const [categories, setCategories] = React.useState<string[]>(["Minden kategória"]);
    const [category, setCategory] = React.useState("");
    const [searchTerm, setSearchTerm] = React.useState("");
    const [minPrice, setMinPrice] = React.useState("0");
    const [maxPrice, setMaxPrice] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = React.useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        (async () => {
            setCategories([...categories, ...await listAllCategories()]);
        })();

        return () => {};
    }, []);
    return (
        <>
        <Form>
            <Input type="text" value={searchTerm} className="search-input" onChange={(value) => setSearchTerm(value.target.value)} placeholder="Cím" />
            <Dropdown className="category-dropdown" isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>{category || "Kategóriák"}</DropdownToggle>
                <DropdownMenu end>
                    <DropdownItem header>Talált kategóriák</DropdownItem>
                    {categories?.map(cat => (
                        <DropdownItem key={cat} onClick={() => setCategory(cat)}><p>{cat}</p></DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <Input type="number" value={minPrice} className="price-input" onChange={(value) => setMinPrice(value.target.value)} placeholder="Minimális ár" />
            <Input type="number" value={maxPrice} className="price-input" onChange={(value) => setMaxPrice(value.target.value)} placeholder="Maximális ár" />
        </Form>
        </>
    );
}

export default SearchBar;