## **Prepare Local DNS Resolution**

You need your machine to resolve `app1.example.local` and `app2.example.local` to the IP of your k3s master node.

**Edit your `/etc/hosts`** file (on your local machine):

```bash
#10.249.70.232
<k3s-master-IP> app1.example.local app2.example.local api-mysql.example.local
```

## **Deploy to Cluster**

SSH into master:

```bash
multipass shell master-node
```

Apply YAMLs:

```bash
kubectl apply -f test_namespace.yaml
kubectl apply -f app1_deployment.yaml
kubectl apply -f app2_deployment.yaml
```

## Test in Browser or curl

- Exit from master-node
- From main server run CURL command:

```bash
curl http://app1.example.local
curl http://app2.example.local
```

You should see Nginx default pages for both.