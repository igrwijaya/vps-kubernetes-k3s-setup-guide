The path of kubeconfig file for K3S usually is `/etc/rancher/k3s/k3s.yaml`. You can copy it to your local machine for easier access.

### Configure TLS for your master node Public IP
By default the k3s will only has TLS for internal IP. to add TLS Subject Alternative Names (SANs) for your IP Public, you need to add configuration in `/etc/rancher/k3s/config.yaml`:
```yaml
tls-san:
  - "your.public.ip.address"
```

then restart k3s:
```bash
sudo systemctl restart k3s
```

### Get the K3S kubeconfig file
```bash
cat /etc/rancher/k3s/k3s.yaml
```
Copy the content of the file and save it to a local file, e.g., `k3s.yaml`.

### Set Your Local kubeconfig
Open your default kubeconfig file, usually located at `C://Users/{username}/.kube/config`, and add your K3S configuration to it.
By default, the k3s config will set the server to: https://127.0.0.1:6443. You need to change it to your master node's Public IP address.
After you change the IP Address you can access your cluster remotely. To verify, run:
```bash
kubectl config get-clusters
kubectl get nodes   
```