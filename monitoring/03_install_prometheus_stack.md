### Install kube-prometheus-stack
```bash
helm install prometheus-stack prometheus-community/kube-prometheus-stack --namespace monitoring
```

#### This installs:
- Prometheus
- Grafana
- Alertmanager
- Node-exporter
- kube-state-metrics
- Pre-built dashboards and alerts

### Get Grafana Admin Password
```bash
kubectl get secret --namespace monitoring prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

### Access Grafana UI with Port Forward
```bash
kubectl port-forward svc/prometheus-stack-grafana -n monitoring 3000:80
```

Then access via http://localhost:3000