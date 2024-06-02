from flask import Flask, jsonify, request
from flask_cors import CORS

from files_utils import load_files, save_groups, structure_data, groups_data
from range_by_smlr import range_by_smlr
from groupId_generator import groupIdGenerator

import numpy as np

app = Flask(__name__)
CORS(app)

structure_data()
groups_data()
data, groups = load_files()

@app.route("/houses", methods=["GET"])
def get_houses():
    houses = []
    for house_id in data.keys():
        house = {
                'id': house_id,
                'total': len(groups[house_id]),
                'total_marked': 0,
                'marked_not_dubl': 0
            }
        
        for advert_id in data[house_id].keys():
            if (groups[house_id][advert_id]):
                house['total_marked'] += 1
                if (not data[house_id][advert_id]['has_duplicates']):
                    house['marked_not_dubl'] += 1
        
        houses.append(house)

    return jsonify({'data': houses})


@app.route("/houses/next", methods=["GET"])
def get_next_house():
    cur_house_id = request.args.get('curHouseId')
    house_ids = np.array(list(data.keys()))
    cur_i = np.where(house_ids == cur_house_id)[0][0]

    if (cur_i + 1 != len(house_ids)):
        return jsonify({'data': house_ids[cur_i + 1]})
    else:
        return jsonify({'data': house_ids[0]})

@app.route("/houses/<houseId>/adverts", methods=["GET"])
def get_adverts(houseId):
    default_advert_id = next(iter(data[houseId].keys()))
    if groups[houseId][default_advert_id]:
        for advert_id in groups[houseId].keys():
            if not groups[houseId][advert_id]:
                default_advert_id = advert_id
                break   

    rangeBy_id = request.args.get('rangeBy', default_advert_id)
    top = request.args.get('top')

    query = data[houseId][rangeBy_id]
    keys = [data[houseId][id] for id in data[houseId].keys() if id != rangeBy_id]

    ranged, diffs = range_by_smlr(query, keys)
    ranged = sorted(ranged, key=lambda x: (not groups[houseId][x] is None, not data[houseId][x]['has_duplicates'], diffs[x]))

    if top:
        ranged.remove(top)
        ranged = [top] + ranged

    def get_room_info(ad):
        info = {}
        for im in ad['images']:
            info[im['category']] = info.get(im['category'], 0) + 1
        return info
    
    return jsonify({
        'data': {
            'query_id': query['id'],
            'ads': [{
                'diff': (diffs[id] if id != query['id'] else None),
                'group': groups[houseId][id],
                'room_types': get_room_info(data[houseId][id]),
                'data': data[houseId][id]
            } for id in [query['id']] + ranged]
        }
    })

@app.route("/houses/<houseId>/adverts", methods=["DELETE"])
def reload_house(houseId):
    for advert_id in groups[houseId].keys():
        if (data[houseId][advert_id]['has_duplicates']):
            groups[houseId][advert_id] = None

    save_groups(groups)
    
    return jsonify({'msg': 'Success'})

@app.route("/houses/<houseId>/adverts/<advertId>/group", methods=["POST"])
def set_group(houseId, advertId):
    q_id = request.args.get('q_id')

    if (q_id):
        group_id = groups[houseId][q_id]
    else:
        group_id = request.json['group_id']
        if (not group_id):
            group_id = None

    groups[houseId][advertId] = group_id
    save_groups(groups)

    return jsonify({'msg': 'Success'})

@app.route("/houses/<houseId>/adverts/<advertId>/group/gen", methods=["POST"])
def gen_group(houseId, advertId):
    group_id = groupIdGenerator.get_free_n()

    groups[houseId][advertId] = group_id
    save_groups(groups)

    return jsonify({'msg': 'Success'})

if __name__ == "__main__":
    app.run(debug=True)