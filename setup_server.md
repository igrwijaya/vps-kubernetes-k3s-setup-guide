## Install dependencies

SSH into your server and update everything:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget vim net-tools
```

Install **Multipass** (a simple VM manager):

```bash
sudo snap install multipass
```

## Create 3 VMs (Master + 2 Workers)

Create the Master Node:

```bash
multipass launch --name master-node --cpus 1 --mem 2500M --disk 15G

```

Create Worker Nodes:

```bash
multipass launch --name worker-node1 --cpus 1.5 --mem 2750M --disk 20G
multipass launch --name worker-node2 --cpus 1.5 --mem 2750M --disk 20G

```

## Connect to the Master Node

SSH into master:

```bash
multipass shell master-node
```

Install **k3s master**:

```bash
curl -sfL https://get.k3s.io | sh -
```

After installed, check the node:

```bash
kubectl get nodes
```

Exit:

```bash
exit
```

## Get the Join Token

SSH again to master-node, then get the node token:

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

Save this token somewhere. You will use it to join the worker nodes.

Also find your master's internal IP:

- exit from master-node
- execute command in main server:

```bash
multipass list
```

## Connect to Worker Nodes and Join Cluster

For **worker-node1**:

```bash
multipass shell worker-node1
```

Install k3s **agent**:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<TOKEN> sh -
```

Replace `<MASTER_IP>` and `<TOKEN>` with your actual values.

Exit:

```bash
exit
```

Do the same for **worker-node2**:

```bash
multipass shell worker-node2
```

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<TOKEN> sh -
```

Exit.

## Check Cluster Status

Back to the master node:

```bash
multipass shell master-node
```

Check nodes:

```bash
kubectl get nodes
```

✅ You should now see 3 nodes (1 master, 2 workers) **Ready**!