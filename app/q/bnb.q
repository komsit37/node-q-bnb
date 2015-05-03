//load sample data from bnb hdb
h: hopen .env.BNB
//{x set h (get;x)}each `vbooking`vbooking2`vfuture`vprop`vhstat`vfstat`room
//{x set h (get;x)} `ids
//\l ext/chart/chart.q

//sample for plotting
//dat: h({{{`key`values!x, enlist y}[x] 0^select x:on, y:avail_price, size:100 from vfuture where id in ids x, on <= .z.d+60} each `residia`conoe`hs};())

//.nv.id: {{`key`values!(y;?[x; enlist(=;`id;enlist y);0b;(`x`y!2#(cols x)except `id)])}[x] each exec distinct id from x};
//dat: .nv.id h ({select on, .room.title id, 0^avail_price from vfuture where id in raze ids[x]}; `residia`conoe`hs)

dat2: h({enlist `key`values!`occupancy, enlist 0!select occupied: {(sum x)%(count x)} not available by on from vfuture};())
flat: h({bnbmap_vflat}; ())
flatmin: select title, city, region, country, accommodates, bedrooms, beds, price_amount, rating, occupancy, avail_price, act_price, revpar from flat where country=`Japan, region=`tokyo

d: h ({future_prices ids x}; `luxury)
.nv.kv: {`key`values!x, enlist y}
dat: {.nv.kv[x] select x:date, y:price, shape:?[status=`avail;`circle;`$"thin-x"], size:?[status=`avail;2;1], status from d where title = x, date <= .z.d+60}each exec distinct title from d