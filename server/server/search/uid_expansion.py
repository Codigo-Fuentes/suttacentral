import regex

from search import csv_loader

# Load uid to acro map
uid_to_acro_map = {}
uid_to_name_map = {}
for row in csv_loader.table_reader('uid_expansion'):
    uid_to_acro_map[row.uid] = row.acro
    uid_to_name_map[row.uid] = row.name


def _expand_uid(uid, mapping):
    components = regex.findall(r'\p{alpha}+|\d+(?:\.\d+)?(?:-\d+)?', uid)
    out = ' '.join(mapping.get(c) or c.upper() for c in components)
    return regex.sub(r'(?<=\d+)-(?=\d+)', r'–', out)


def uid_to_acro(uid):
    return _expand_uid(uid, uid_to_acro_map)


languages = csv_loader.load_table('language')
