### Apply ArgoCD Deployment
```bash
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### Wait for Pods to be Ready
```bash
kubectl get pods -n argocd -w
```

Wait until all are in Running or Completed status.

### Patch the argocd-server Service to Use ClusterIP (if needed)
If it's type: LoadBalancer, you can patch it:

```bash
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "ClusterIP"}}'
```

### Enable HTTP 80 Access
```bash
kubectl -n argocd patch deployment argocd-server \
  --type='json' \
  -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--insecure"}]'
```

### Get the Initial Admin Password
The default username is `admin`.
To get the password:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo
```

