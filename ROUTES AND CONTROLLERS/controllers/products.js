const getallproducts = async(req,resp) => {
    resp.status(200).send({message:"I am geating all products list"});
};

const getallproducttesting = async(req,resp) => {
    resp.status(200).send({message:"I am getating all productstesting list"})
}

module.exports = {getallproducts,getallproducttesting};