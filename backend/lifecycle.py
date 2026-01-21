VALID_TRANSITIONS = {
    "Created": ["Approved", "Revoked"],
    "Approved": ["Sent"],
    "Sent": ["Signed", "Revoked"],
    "Signed": ["Locked"],
    "Locked": [],
    "Revoked": []
}

def is_valid_transition(current, next_state):
    return next_state in VALID_TRANSITIONS[current]

