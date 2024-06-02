import numpy as np

using_col_names = ['area_total', 'price', 'room_count', 'floor']

def calc_diffs(query, keys):
    diffs = {}
    for col_name in using_col_names:
        for key_id in keys.keys():
            diffs[key_id] = diffs.get(key_id, 0.0) + (abs(query[col_name] - keys[key_id][col_name]))
    
    return diffs

import numpy as np

def normalize(q, keys):
    keys_normalize = {}
    query_normalize = {}

    for col_name in using_col_names:
        values = np.array([ad[col_name] for ad in ([q] + keys)])
        normalize_values = values / np.linalg.norm(values, axis=0)

        normalize_q_col, normalize_keys_col = normalize_values[0], normalize_values[1:]

        query_normalize[col_name] = query_normalize.get(col_name, normalize_q_col)
        for i, ad in enumerate(keys):
            if (ad['id'] not in keys_normalize):
                keys_normalize[ad['id']] = {}

            keys_normalize[ad['id']].update({col_name: normalize_keys_col[i]})

    return query_normalize, keys_normalize

def range_by_smlr(query, keys):
    query_normalize, keys_normalize = normalize(query, keys)
    
    diffs = calc_diffs(query_normalize, keys_normalize)

    ranged = sorted(diffs.keys(), key=lambda x: diffs[x])

    return ranged, diffs