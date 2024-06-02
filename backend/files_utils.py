import json
import os

from groupId_generator import groupIdGenerator

data_path = 'additional_files/kiev.json'
structure_data_path = 'additional_files/kiev_structure.json'
groups_path = 'additional_files/kiev_groups.json'

uah2usd = 40.1
eur2usd = 0.92

def load_files():
    with open(structure_data_path, 'r') as f:
        data = json.load(f)

    with open(groups_path, 'r') as f:
        groups = json.load(f)

    return data, groups

def save_groups(groups):
    with open(groups_path, 'w') as f:
        json.dump(groups, f)

def build_data_structure(data_path, to_path, get_value_fun):
    if (os.path.exists(to_path)):
        print(f'{to_path} exist')
        return

    with open(data_path, 'r') as f:
        data = json.load(f)

    structed = {}
    for advert in data:
        house_id = advert['house_id']
        if (house_id not in structed):
            structed[house_id] = {}
        
        structed[house_id][advert['id']] = get_value_fun(advert)

    with open(to_path, 'w') as f:
        json.dump(structed, f)

def cvt2usd(ad):
    if (ad['currency'] == 'USD'):
        pass
    elif(ad['currency'] == 'UAH'):
        ad['price'] /= uah2usd
    elif(ad['currency'] == 'EUR'):
        ad['price'] /= eur2usd
    else:
        print('unknowm currency:', ad['currency'])
    ad['price'] = int(ad['price'])
    return ad        

def cvt_ad(ad):
    ad = cvt2usd(ad)
    ad['id'] = str(ad['id'])
    ad['location'][0] = round(ad['location'][0], 2)
    ad['location'][1] = round(ad['location'][1], 2)
    return ad

def get_group_id(ad):
    if (ad['has_duplicates']):
        return None
    else:
        return groupIdGenerator.get_free_n()

def structure_data():
    build_data_structure(data_path, structure_data_path, lambda x: cvt_ad(x))

def groups_data():
    build_data_structure(data_path, groups_path, lambda x: get_group_id(x))

        