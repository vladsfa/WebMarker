import json
import os

free_n_path = 'additional_files/free_n.json'

if (not os.path.exists(free_n_path)):
    with open(free_n_path, 'w') as f:
        json.dump({
            'free_n': 1
        }, f)
else:
    print(f'${free_n_path} exist')

class GroupIdGenerator():
    def __init__(self):
        with open(free_n_path, 'r') as f:
            self.free_n = json.load(f)['free_n']
    
    def save(self):
        with open(free_n_path, 'w') as f:
            json.dump({
                'free_n': self.free_n
            }, f)

    def get_free_n(self):
        n = self.free_n
        self.free_n += 1
        self.save()

        return str(n)
    

groupIdGenerator = GroupIdGenerator()