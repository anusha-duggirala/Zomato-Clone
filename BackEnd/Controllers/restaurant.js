const Restaurant = require('../Models/restaurant');
const Item=require('../Models/item');

exports.getRestaurantByLocation = (req, res) => {
    const location_Id = req.params.locationId;
    Restaurant.find({ location_id: Number(location_Id) })
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}


exports.filterRestaurants = (req, res) => {
    const requestBody = req.body;
    const mealtype = requestBody.mealtype_id;
    const location = requestBody.location_id;
    const cuisine = requestBody.cuisine;
    const hcost = requestBody.hcost;
    const lcost = requestBody.lcost;
    const sort = requestBody.sort ? requestBody.sort : 1;
    const page = requestBody.page ? requestBody.page : 1;

    let payload = {};
    const countPerPage = 2;

    let startIndex;
    let endIndex;
    let filteredResponse = [];

    startIndex = (page * countPerPage) - countPerPage;
    endIndex = (page * countPerPage);

    if (mealtype) {
        payload = { mealtype_id: mealtype }
    }
    if (mealtype && location) {
        payload = { mealtype_id: mealtype, location_id: location }
    }
    if (mealtype && cuisine) {
        payload["mealtype_id"] = mealtype;
        payload["cuisine"] = {$elemMatch:{id:{$in:cuisine}}}
    }
    if (mealtype && location && cuisine) {
        payload["mealtype_id"] = mealtype;
        payload["location_id"] = location;
        payload["cuisine"] = {$elemMatch:{id:{$in:cuisine}}}
    }
    if (mealtype && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && location && lcost && hcost) {
        payload = {
            mealtype_id: mealtype,
            location_id: location,
            min_price: { $lte: hcost, $gte: lcost }
        }
    }
    if (mealtype && cuisine && lcost && hcost) {

        payload["mealtype_id"] = mealtype,
        payload["cuisine"] = {$elemMatch:{id:{$in:cuisine}}},
            payload["min_price"] = { $lte: hcost, $gte: lcost }
    }

    if (mealtype && location && cuisine && lcost && hcost) {
        payload["mealtype_id"] = mealtype,
        payload["cuisine"] = {$elemMatch:{id:{$in:cuisine}}},
        payload["min_price"] = { $lte: hcost, $gte: lcost },
        payload["location_id"]=location
    }


    Restaurant.find(payload).sort({ min_price: sort })
        .then(response => {
            const pageCount = Math.ceil(response.length / countPerPage);
            const pageCountArr=[];
            filteredResponse = response.slice(startIndex, endIndex);
            
            for(var i=1;i<=pageCount;i++)
            {
                pageCountArr.push(i);
            }

            res.status(200).json({
                message: "Restaurant Filtered Successfully", restaurants: filteredResponse, pageCount
                    : pageCountArr,totalCount:response.length
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getRestaurantDetailsById = (req, res) => {
    const restaurantId = req.params.restaurantId;
    Restaurant.findById(restaurantId)
        .then(response => {
            res.status(200).json({ message: "Restaurant Fetched Successfully", restaurants: response })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}

exports.getItemsByRestaurant=(req,res)=>{
    const resId=req.params.resId;
    Item.find({restaurantId:resId}).then(result=>{
        res.status(200).json({message: "Restaurant items fetched successfully",itemsList:result})
    }).catch(err=>console.log(err))
}



