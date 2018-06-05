const con = require("../../db/connection");
const PAGE_SIZE = 15;

const addFilm = async (v)=>{
    let {title, year, format, stars} = v;
    let resFilm =  await con.Film.findOrCreate({where:{title}, defaults: {title, year, format}});
    for(actor of stars){
        let resActor = await con.Actor.findOrCreate({where:{first_name: actor[0], second_name:actor[1]},
            defaults: {first_name: actor[0], second_name:actor[1]}});
        await con.FilmActor.findOrCreate({where:{actorId:resActor[0].id, filmId: resFilm[0].id}, defaults: {actorId:resActor[0].id, filmId: resFilm[0].id}});
    }
    return resFilm;
    //return ((film)=>new Promise((rej, res, resFilm)=>film[0].id ? rej() : res()))(resFilm);
}

    const getAllFilms = (offset, limit)=>{
        return con.Film.findAll({
            include: [{
            model: con.Actor,
            through: {
            },
            }],
            offset,
            limit,
            duplicating: false,
        });
        }


const getPageOfFilmsAndNumberNext = async(page)=>{
    page = parseInt(page);
    let count = await con.Film.count();
    let totalCountOfPage = Math.floor(count / PAGE_SIZE);
    let offset = page * PAGE_SIZE;
    let result = {};
    if(totalCountOfPage > page){
        result.data = await getAllFilms(offset, PAGE_SIZE);
        result.nextPage = page + 1;
    } else {
        result.data = await getAllFilms(offset, PAGE_SIZE);
        result.nextPage = 1;
    }
    return result;
}


    const getAllFilmsByTitle = (title)=>{
        return con.Film.findAll({
            include: [{
                model: con.Actor,
                through: {
                },
            }],
            duplicating: false,
            where:{
                title:{
                    [con.Op.like]:"%"+title+"%"
                }
            }
        });
    }

    const getAllFilmsByActorName = (name)=>{
        console.log(name, "from model")
        return con.Film.findAll({
            include: [{
                model: con.Actor,
                through: {
                },
                where:{
                    first_name:{
                        [con.Op.like]:"%"+name+"%"
                    }
                }
            }],
            duplicating: false,
        });
    }


const ListToDB = async(data)=>{
    for(film in data){
        let resFilm =  await con.Film.findOrCreate({where:{title:data[film].title}, defaults: {title:data[film].title, year:data[film].year, format:data[film].format}});
        for(actor in data[film].stars){
            let resActor = await con.Actor.findOrCreate({where:{first_name: data[film].stars[actor][0], second_name:data[film].stars[actor][1]},
                defaults: {first_name: data[film].stars[actor][0], second_name:data[film].stars[actor][1]}});
            await con.FilmActor.findOrCreate({where:{actorId:resActor[0].id, filmId: resFilm[0].id}, defaults: {actorId:resActor[0].id, filmId: resFilm[0].id}});
        }
    }
    return true;
}


const deleteFilm = (id)=>{
    return con.Film.destroy({
        where: {
            id
        }
    })
}




module.exports = {
    addFilm,
    getAllFilms,
    ListToDB,
    getAllFilmsByTitle,
    deleteFilm,
    getAllFilmsByActorName,
    getPageOfFilmsAndNumberNext
}