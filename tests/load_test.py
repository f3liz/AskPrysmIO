import requests
import threading
import time

URL = "http://localhost:8000/chats/"

TOKEN = "YOUR_ACCESS_TOKEN"

cookies = {
    "access_token": TOKEN
}

results = []


def send_request(i):
    start = time.time()

    try:
        res = requests.post(
            URL,
            json={"question": f"test {i}"},
            cookies=cookies
        )

        duration = time.time() - start

        results.append({
            "id": i,
            "status": res.status_code,
            "time": duration
        })

        print(f"{i} -> {res.status_code} ({duration:.2f}s)")

    except Exception as e:
        print(f"{i} failed: {e}")


threads = []

for i in range(20):  # num of concurrent users
    t = threading.Thread(target=send_request, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()


print("\n--- SUMMARY ---")
success = sum(1 for r in results if r["status"] == 200)

print(f"Total requests: {len(results)}")
print(f"Successful: {success}")
print(f"Failed: {len(results) - success}")
print(f"Avg response time: {sum(r['time'] for r in results)/len(results):.2f}s")