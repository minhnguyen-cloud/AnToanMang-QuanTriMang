// Hard question bank for Network Administration.
const NETWORK_QUESTION_BANK = [
  {
    id: 'QTM-OSPF-01',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Đọc cấu hình OSPF',
    difficulty: 3,
    config: 'router ospf 1\n router-id 1.1.1.1\n passive-interface default\n no passive-interface Gi0/0\n network 10.10.12.0 0.0.0.3 area 0\n network 192.168.10.0 0.0.0.255 area 10',
    question: 'Nhận định nào đúng nhất về cấu hình trên?',
    options: [
      'Router chỉ gửi Hello OSPF trên Gi0/0, còn các interface khác vẫn được quảng bá nếu match network',
      'Router sẽ không quảng bá mạng 192.168.10.0/24 vì passive-interface default chặn luôn LSA',
      'OSPF bắt buộc tất cả network phải nằm trong area 0',
      'Router-id 1.1.1.1 chỉ có hiệu lực nếu Gi0/0 có IP 1.1.1.1',
      'Wildcard 0.0.0.3 tương đương với subnet /24'
    ],
    answer: 0,
    explanation: 'Passive interface không gửi Hello nên không lập neighbor trên interface đó, nhưng prefix vẫn có thể được đưa vào OSPF nếu match network statement.'
  },
  {
    id: 'QTM-OSPF-02',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Neighbor OSPF',
    difficulty: 3,
    context: 'R1 Gi0/0 = 10.0.12.1/30 area 0, R2 Gi0/0 = 10.0.12.2/30 area 10. Cùng hello/dead timer, cùng authentication, ping trực tiếp được.',
    question: 'Nguyên nhân sát nhất khiến hai router không lên OSPF neighbor FULL là gì?',
    options: [
      'Area ID trên cùng một link không khớp',
      'Không có default route',
      'Không bật NAT overload',
      'Router-id phải giống nhau',
      'OSPF không chạy trên mạng /30'
    ],
    answer: 0,
    explanation: 'OSPF neighbor trên cùng một segment phải khớp area, subnet, timer, authentication và một số cờ; area mismatch là lỗi kinh điển trong đề đọc cấu hình.'
  },
  {
    id: 'QTM-OSPF-03',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Đọc bảng định tuyến',
    difficulty: 3,
    config: 'Gateway of last resort is 10.0.0.1 to network 0.0.0.0\nO IA 172.16.20.0/24 [110/30] via 10.0.12.2, 00:00:11, Gi0/0\nO    10.10.10.0/24 [110/20] via 10.0.13.3, 00:00:08, Gi0/1\nS*   0.0.0.0/0 [1/0] via 10.0.0.1',
    question: 'Dòng nào cho thấy route học từ OSPF khác area?',
    options: ['O IA 172.16.20.0/24', 'O 10.10.10.0/24', 'S* 0.0.0.0/0', 'Gateway of last resort', '[1/0]'],
    answer: 0,
    explanation: 'Trong Cisco IOS, O IA là OSPF inter-area. O là intra-area, S là static route.'
  },
  {
    id: 'QTM-OSPF-04',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Thiết kế OSPF',
    difficulty: 3,
    image: {src:'assets/qtm-campus-topology.svg', alt:'Campus topology with core, distribution, access, DMZ and WAN routers', caption:'Topology campus mô phỏng đề QTM: core, access VLAN, DMZ và WAN.'},
    question: 'Tự luận: Với topology trong hình, đề xuất cách chia area OSPF, vị trí default route, và 3 lỗi cấu hình có khả năng làm mạng liên VLAN/DMZ không thông.',
    answer: 'Gợi ý: core/WAN nên ở area 0; các nhánh hoặc access lớn có thể tách area nếu cần. Default route thường originate từ edge/firewall ra Internet. Lỗi hay gặp: trunk thiếu VLAN, SVI shutdown hoặc thiếu default gateway, OSPF area mismatch/passive nhầm interface, ACL/NAT đặt sai chiều.',
    explanation: 'Câu kiểu vận dụng yêu cầu nối routing, switching và firewall thay vì học thuộc riêng từng khái niệm.'
  },
  {
    id: 'QTM-OSPF-05',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Default route trong OSPF',
    difficulty: 3,
    config: 'ip route 0.0.0.0 0.0.0.0 203.0.113.1\nrouter ospf 10\n default-information originate',
    question: 'Điều kiện thực tế để lệnh default-information originate quảng bá default route là gì?',
    options: [
      'Router phải có default route trong routing table, trừ khi dùng tùy chọn always',
      'Tất cả router trong domain phải có cùng router-id',
      'Chỉ hoạt động nếu default route là OSPF route',
      'Bắt buộc area phải là NSSA',
      'Chỉ quảng bá cho interface passive'
    ],
    answer: 0,
    explanation: 'Mặc định, router cần có 0.0.0.0/0 trong bảng định tuyến thì mới originate default route vào OSPF.'
  },
  {
    id: 'QTM-SW-01',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Trunk allowed VLAN',
    difficulty: 3,
    config: 'interface Gi0/1\n description Uplink-to-Core\n switchport mode trunk\n switchport trunk allowed vlan 10,20\n!\ninterface Vlan30\n ip address 192.168.30.1 255.255.255.0',
    question: 'VLAN 30 không đi qua uplink. Lỗi hợp lý nhất là gì?',
    options: [
      'VLAN 30 không nằm trong danh sách allowed VLAN trên trunk',
      'SVI Vlan30 có IP private nên bị chặn',
      'Trunk không bao giờ mang VLAN 10 và 20 cùng lúc',
      'Cần bật OSPF trên switchport trunk trước',
      'Native VLAN phải là VLAN 30'
    ],
    answer: 0,
    explanation: 'Trunk chỉ mang VLAN được phép. Nếu VLAN tồn tại nhưng bị loại khỏi allowed list, traffic VLAN đó không qua uplink.'
  },
  {
    id: 'QTM-SW-02',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Native VLAN mismatch',
    difficulty: 3,
    context: 'SW1 cấu hình native VLAN 99 trên trunk Gi0/1. SW2 vẫn để native VLAN 1 trên cổng nối SW1. Các VLAN tag vẫn có thể chạy nhưng log báo native VLAN mismatch.',
    question: 'Rủi ro chính của lỗi này là gì?',
    options: [
      'Frame không tag có thể bị đưa vào VLAN khác, tạo rủi ro leak hoặc loop khó dò',
      'Tất cả VLAN tagged tự động bị xóa khỏi switch',
      'STP bị tắt hoàn toàn trên mọi VLAN',
      'OSPF sẽ đổi router-id',
      'DHCP server luôn cấp sai DNS'
    ],
    answer: 0,
    explanation: 'Native VLAN xử lý frame không tag. Mismatch làm hai đầu hiểu khác nhau, gây lỗi bảo mật và vận hành.'
  },
  {
    id: 'QTM-SW-03',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'PortFast/BPDU Guard',
    difficulty: 3,
    config: 'interface range Gi0/10-20\n switchport mode access\n spanning-tree portfast\n spanning-tree bpduguard enable',
    question: 'Ý nghĩa đúng nhất của cấu hình này là gì?',
    options: [
      'Cổng access lên forwarding nhanh, nhưng sẽ err-disable nếu nhận BPDU',
      'Cổng trở thành trunk động nếu nhận BPDU',
      'BPDU Guard giúp switch bỏ qua mọi vòng lặp layer 2',
      'PortFast chỉ dùng cho uplink giữa switch',
      'Cấu hình này thay thế được EtherChannel'
    ],
    answer: 0,
    explanation: 'PortFast dành cho endpoint; BPDU Guard bảo vệ khi ai đó cắm switch vào cổng access.'
  },
  {
    id: 'QTM-SW-04',
    type: 'short',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Troubleshooting liên VLAN',
    difficulty: 3,
    image: {src:'assets/qtm-campus-topology.svg', alt:'Campus VLAN topology', caption:'VLAN 10/20 đi qua access switch lên core L3.'},
    question: 'Tự luận: PC VLAN 10 ping được gateway VLAN 10 nhưng không ping được server ở VLAN 20. Hãy nêu quy trình kiểm tra từ layer 2 đến layer 3.',
    answer: 'Kiểm tra VLAN membership, trunk allowed/native VLAN, trạng thái SVI VLAN 10/20, default gateway của host, routing liên VLAN trên switch/router L3, ACL giữa VLAN, ARP/MAC table và log STP.',
    explanation: 'Đề QTM khó thường yêu cầu trình tự troubleshoot, không chỉ nêu một lệnh.'
  },
  {
    id: 'QTM-SW-05',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'EtherChannel',
    difficulty: 3,
    config: 'interface range Gi0/1-2\n channel-group 1 mode active\n!\ninterface Port-channel1\n switchport mode trunk',
    question: 'Từ khóa mode active cho biết giao thức nào đang được dùng?',
    options: ['LACP', 'PAgP', 'DTP', 'HSRP', 'OSPF'],
    answer: 0,
    explanation: 'LACP dùng active/passive; PAgP dùng desirable/auto.'
  },
  {
    id: 'QTM-ACL-01',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Thứ tự ACL',
    difficulty: 3,
    config: 'ip access-list extended WEB-IN\n deny tcp any host 10.10.10.20 eq 443\n permit tcp host 203.0.113.5 host 10.10.10.20 eq 443\n permit ip any any',
    question: 'Vì sao host 203.0.113.5 vẫn không truy cập HTTPS được vào 10.10.10.20?',
    options: [
      'Dòng deny rộng hơn đứng trước dòng permit đặc hiệu',
      'Extended ACL không lọc được TCP port',
      'ACL phải đặt tên là số mới chạy',
      'permit ip any any luôn có độ ưu tiên cao nhất',
      'HTTPS không dùng port 443'
    ],
    answer: 0,
    explanation: 'ACL được xử lý từ trên xuống. Match đầu tiên thắng, nên permit phía sau không còn cơ hội áp dụng.'
  },
  {
    id: 'QTM-ACL-02',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Vị trí đặt ACL',
    difficulty: 3,
    question: 'Một extended ACL chặn VLAN sinh viên truy cập server quản trị nhưng vẫn cho đi Internet. Nên đặt ACL ở đâu để hợp lý nhất?',
    options: [
      'Gần nguồn, trên interface/SVI của VLAN sinh viên theo chiều vào',
      'Gần server quản trị theo chiều ra Internet',
      'Trên mọi switch access ở cả hai chiều',
      'Chỉ đặt trên cổng console',
      'Đặt sau rule permit any any'
    ],
    answer: 0,
    explanation: 'Extended ACL lọc theo nguồn, đích và dịch vụ nên đặt gần nguồn để chặn sớm đúng traffic cần chặn.'
  },
  {
    id: 'QTM-NAT-01',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'NAT overload',
    difficulty: 3,
    config: 'access-list 1 permit 192.168.10.0 0.0.0.255\ninterface Gi0/0\n ip nat inside\ninterface Gi0/1\n ip nat outside\nip nat inside source list 1 interface Gi0/1 overload',
    question: 'Cấu hình này thực hiện cơ chế nào?',
    options: [
      'PAT/NAT overload cho mạng 192.168.10.0/24 ra IP của Gi0/1',
      'Static NAT một-một cho server web',
      'Chặn toàn bộ outbound traffic',
      'Tạo VPN site-to-site',
      'Cấp IP DHCP cho VLAN 10'
    ],
    answer: 0,
    explanation: 'overload cho phép nhiều host inside dùng chung một public IP bằng cách phân biệt port.'
  },
  {
    id: 'QTM-NAT-02',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Static NAT',
    difficulty: 3,
    config: 'ip nat inside source static tcp 10.10.10.50 80 203.0.113.10 8080',
    question: 'Người ngoài Internet truy cập dịch vụ web nội bộ bằng cổng nào trên IP public?',
    options: ['203.0.113.10:8080', '203.0.113.10:80', '10.10.10.50:8080', '10.10.10.50:443', '203.0.113.10:22'],
    answer: 0,
    explanation: 'Cấu hình ánh xạ inside local 10.10.10.50:80 ra inside global 203.0.113.10:8080.'
  },
  {
    id: 'QTM-IPTABLES-01',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'iptables stateful rule',
    difficulty: 3,
    config: 'iptables -P INPUT DROP\niptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT\niptables -A INPUT -p tcp --dport 22 -s 10.0.0.0/8 -j ACCEPT',
    question: 'Rule ESTABLISHED,RELATED có tác dụng chính gì?',
    options: [
      'Cho phép gói phản hồi thuộc kết nối hợp lệ đã được theo dõi',
      'Mở SSH cho toàn bộ Internet',
      'NAT địa chỉ nguồn sang IP public',
      'Tự động tạo route mặc định',
      'Tắt kiểm tra trạng thái kết nối'
    ],
    answer: 0,
    explanation: 'Đây là tư duy firewall stateful trên Linux: cho phản hồi của phiên hợp lệ đi qua, còn INPUT mặc định vẫn DROP.'
  },
  {
    id: 'QTM-FW-01',
    type: 'short',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'DMZ policy',
    difficulty: 3,
    question: 'Tự luận: Thiết kế rule firewall cho mô hình Internet - DMZ web - LAN database. Nêu rule tối thiểu và rule tuyệt đối không nên mở.',
    answer: 'Cho Internet vào DMZ web đúng port 80/443; cho web trong DMZ sang database đúng port cần thiết và chỉ tới IP DB; cho LAN quản trị vào DMZ qua VPN/jump host. Không mở Internet trực tiếp vào database, không dùng any-any, log deny quan trọng.',
    explanation: 'Câu này kiểm tra least privilege, segmentation và hiểu đúng vai trò DMZ.'
  },
  {
    id: 'QTM-DOCKER-01',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker Compose',
    difficulty: 3,
    config: 'services:\n  app:\n    image: myweb:1.0\n    ports:\n      - "8080:80"\n  db:\n    image: postgres:16\n    networks:\n      - backend',
    question: 'Nhận định nào đúng nhất?',
    options: [
      'Người dùng truy cập web qua port 8080 trên host, container app nghe port 80',
      'Database postgres tự động public ra Internet',
      'ports 8080:80 nghĩa là container nghe port 8080',
      'Không thể để app và db ở hai service khác nhau',
      'Docker Compose tự động tạo Kubernetes Ingress'
    ],
    answer: 0,
    explanation: 'Docker ports dùng dạng host:container. Database không public nếu không khai báo ports.'
  },
  {
    id: 'QTM-K8S-01',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes Service',
    difficulty: 3,
    config: 'kind: Service\nspec:\n  type: ClusterIP\n  selector:\n    app: api\n  ports:\n  - port: 80\n    targetPort: 8080',
    question: 'Service này có ý nghĩa gì?',
    options: [
      'Tạo IP nội bộ trong cluster, chuyển port 80 của service tới port 8080 của Pod có label app=api',
      'Mở trực tiếp port 80 ra Internet trên mọi node',
      'Tự động build Docker image api',
      'Chỉ dùng được nếu Pod chạy privileged',
      'Thay thế hoàn toàn Ingress Controller'
    ],
    answer: 0,
    explanation: 'ClusterIP chỉ expose nội bộ cluster; selector quyết định Pod backend, targetPort là port container.'
  },
  {
    id: 'QTM-K8S-02',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Selector mismatch',
    difficulty: 3,
    config: 'Pod labels: app=web, tier=frontend\nService selector: app=api',
    question: 'Triệu chứng hợp lý nhất là gì?',
    options: [
      'Service không có endpoint backend phù hợp',
      'Pod tự động đổi label thành app=api',
      'Kubelet sẽ xóa Service ngay lập tức',
      'Ingress vẫn route được vì bỏ qua Service',
      'DNS của cluster bị tắt'
    ],
    answer: 0,
    explanation: 'Service chọn Pod bằng label selector. Selector sai dẫn tới endpoint rỗng, rất hay bị hỏi trong bài deploy web bằng Kubernetes.'
  },
  {
    id: 'QTM-K8S-03',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Probe Kubernetes',
    difficulty: 3,
    question: 'Phân biệt đúng nhất giữa readinessProbe và livenessProbe là gì?',
    options: [
      'Readiness quyết định Pod đã nhận traffic chưa; liveness quyết định container có cần restart không',
      'Readiness chỉ dùng cho database, liveness chỉ dùng cho web',
      'Hai probe giống hệt nhau và luôn restart container',
      'Liveness tạo LoadBalancer cloud',
      'Readiness chỉ kiểm tra DNS'
    ],
    answer: 0,
    explanation: 'Đây là bẫy vận hành hiện đại: sẵn sàng nhận traffic khác với còn sống để restart.'
  },
  {
    id: 'QTM-CLOUD-01',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Cloud security group',
    difficulty: 3,
    context: 'Một VM cloud chạy web sau load balancer. Security group của VM mở 22 từ 0.0.0.0/0 và 80 từ 0.0.0.0/0.',
    question: 'Điểm yếu cần sửa trước là gì?',
    options: [
      'SSH mở toàn Internet; nên giới hạn qua VPN/bastion/IP quản trị',
      'Port 80 không thể chạy trên cloud',
      'Load balancer không dùng được với VM',
      'Security group không lọc được inbound',
      'Phải mở thêm port 3306 cho Internet'
    ],
    answer: 0,
    explanation: 'Cloud exam hay hỏi shared responsibility và firewall/security group. SSH public là rủi ro vận hành rất lớn.'
  },
  {
    id: 'QTM-CLOUD-02',
    type: 'short',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Cloud/K8s design',
    difficulty: 3,
    image: {src:'assets/qtm-cloud-lb.svg', alt:'Cloud load balancer and Kubernetes topology', caption:'Web app qua LB/Ingress, service, pod và database private.'},
    question: 'Tự luận: Với mô hình trong hình, hãy nêu luồng truy cập từ Internet vào Pod, vị trí đặt TLS, và 4 điểm cần hardening.',
    answer: 'Luồng: client -> DNS -> load balancer/Ingress -> Service -> Pod. TLS có thể terminate ở LB/Ingress hoặc passthrough tùy yêu cầu. Hardening: security group, network policy, secret management, RBAC, image scanning, probe/limit, log/monitoring, backup database.',
    explanation: 'Câu này trộn cloud, Kubernetes và bảo mật vận hành, đúng kiểu đề mới khó hơn lý thuyết thuần.'
  },
  {
    id: 'QTM-HAPROXY-01',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'HAProxy',
    difficulty: 3,
    config: 'backend web_pool\n balance roundrobin\n option httpchk GET /health\n server web1 10.0.1.11:80 check\n server web2 10.0.1.12:80 check',
    question: 'HAProxy sẽ làm gì khi /health của web2 trả lỗi liên tục?',
    options: [
      'Tạm loại web2 khỏi pool cho tới khi health check đạt lại',
      'Vẫn chia traffic đều vì roundrobin bỏ qua health check',
      'Xóa web2 khỏi file cấu hình',
      'Tự động tăng CPU cho web1',
      'Chuyển toàn bộ traffic sang database'
    ],
    answer: 0,
    explanation: 'server ... check kết hợp httpchk giúp load balancer tránh gửi traffic đến backend không khỏe.'
  },
  {
    id: 'QTM-OPENVPN-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'OpenVPN',
    difficulty: 3,
    config: 'server 10.8.0.0 255.255.255.0\npush "route 192.168.10.0 255.255.255.0"\nclient-to-client\nkeepalive 10 120',
    question: 'Dòng push route có tác dụng gì?',
    options: [
      'Đẩy route tới client để truy cập mạng LAN 192.168.10.0/24 qua VPN',
      'Cấp public IP cho client',
      'Bật mã hóa AES tự động trong LAN',
      'Cấm client nhìn thấy mọi mạng nội bộ',
      'Chỉ định DNS authoritative'
    ],
    answer: 0,
    explanation: 'OpenVPN push route giúp client biết mạng nội bộ nào cần đi qua tunnel.'
  },
  {
    id: 'QTM-DHCP-01',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DHCP relay',
    difficulty: 3,
    context: 'DHCP server đặt ở VLAN Server. Client ở VLAN 20 gửi DHCP Discover broadcast nhưng không nhận IP. Routing liên VLAN vẫn ping được khi gán IP tĩnh.',
    question: 'Cấu hình thiếu hợp lý nhất trên gateway VLAN 20 là gì?',
    options: ['ip helper-address trỏ về DHCP server', 'router ospf 1', 'switchport mode trunk', 'ip nat outside', 'spanning-tree portfast trunk'],
    answer: 0,
    explanation: 'DHCP Discover là broadcast layer 2, không đi qua router nếu không có DHCP relay/ip helper-address.'
  },
  {
    id: 'QTM-DNS-01',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DNS nội bộ',
    difficulty: 3,
    context: 'Người dùng nội bộ truy cập app.company.local cần trỏ về IP private 10.10.10.20, còn người ngoài truy cập app.company.com trỏ về IP public sau reverse proxy.',
    question: 'Khái niệm/thiết kế nào sát nhất?',
    options: ['Split-horizon DNS hoặc zone nội bộ riêng', 'STP root guard', 'OSPF NSSA', 'DHCP starvation', 'MAC flooding'],
    answer: 0,
    explanation: 'DNS nội bộ và công khai có thể trả lời khác nhau theo vị trí truy vấn để tránh hairpin và giảm lộ thông tin nội bộ.'
  },
  {
    id: 'QTM-ZABBIX-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Zabbix monitoring',
    difficulty: 3,
    question: 'Một trigger Zabbix chỉ dựa vào CPU > 80% trong 1 phút thường yếu ở đâu?',
    options: [
      'Dễ báo động giả; nên kết hợp duration hợp lý, load, memory, disk I/O hoặc service health',
      'Zabbix không thể giám sát CPU',
      'Trigger càng ngắn càng chính xác tuyệt đối',
      'CPU > 80% luôn là sự cố bảo mật',
      'Chỉ SNMP mới đo được CPU'
    ],
    answer: 0,
    explanation: 'Monitoring tốt phải giảm nhiễu, có ngữ cảnh và đo triệu chứng người dùng cảm nhận được.'
  },
  {
    id: 'QTM-ANSIBLE-01',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Ansible/idempotent',
    difficulty: 3,
    config: '- name: Ensure nginx is installed\n  apt:\n    name: nginx\n    state: present\n- name: Ensure service is running\n  service:\n    name: nginx\n    state: started\n    enabled: yes',
    question: 'Tính chất quan trọng của playbook này là gì?',
    options: [
      'Idempotent: chạy nhiều lần vẫn hướng hệ thống về cùng trạng thái mong muốn',
      'Mỗi lần chạy sẽ cài thêm một bản nginx mới',
      'Chỉ chạy được nếu có giao diện đồ họa',
      'Tự động tạo Kubernetes cluster',
      'Không cần SSH hoặc agent nào'
    ],
    answer: 0,
    explanation: 'Automation vận hành cần idempotent để giảm sai lệch cấu hình và chạy lặp an toàn.'
  },
  {
    id: 'QTM-SERVICE-01',
    type: 'match',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Dịch vụ server',
    difficulty: 3,
    question: 'Ghép dịch vụ với vai trò đúng.',
    answer: [
      ['NFS', 'Chia sẻ file kiểu Unix/Linux'],
      ['SMB/CIFS', 'Chia sẻ file phổ biến cho Windows/AD'],
      ['FTP', 'Truyền file, cần chú ý active/passive và TLS'],
      ['Zabbix Agent', 'Gửi/cho phép thu thập metric host']
    ],
    explanation: 'Đề đồ án hay trộn dịch vụ file server với monitoring và chính sách firewall.'
  },
  {
    id: 'QTM-ADDS-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Active Directory',
    difficulty: 3,
    question: 'Vì sao DNS là thành phần sống còn trong Active Directory Domain Services?',
    options: [
      'Client dùng DNS SRV record để tìm domain controller và dịch vụ AD',
      'AD DS không dùng authentication',
      'DNS thay thế hoàn toàn Kerberos',
      'Domain controller chỉ hoạt động nếu mở FTP',
      'DNS chỉ dùng để phân giải website public'
    ],
    answer: 0,
    explanation: 'Sai DNS là một trong các lỗi làm join domain, login và Group Policy thất bại.'
  },
  {
    id: 'QTM-GUAC-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Apache Guacamole',
    difficulty: 3,
    question: 'Khi triển khai Apache Guacamole để truy cập RDP/SSH qua trình duyệt, điểm hardening nào quan trọng nhất?',
    options: [
      'Đặt sau HTTPS reverse proxy, bật MFA/SSO nếu có, giới hạn quyền và log phiên truy cập',
      'Public trực tiếp guacd ra Internet',
      'Tắt mọi xác thực để giảm độ trễ',
      'Dùng chung tài khoản admin cho mọi sinh viên',
      'Mở SMB ra Internet để Guacamole nhanh hơn'
    ],
    answer: 0,
    explanation: 'Guacamole là cổng truy cập quản trị tập trung, nên phải kiểm soát xác thực, mã hóa, phân quyền và audit.'
  },
  {
    id: 'QTM-IPV6-01',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'IPv6 deployment',
    difficulty: 3,
    question: 'Trong triển khai web trên IPv6, lỗi bảo mật nào hay bị bỏ sót?',
    options: [
      'Firewall IPv6 không tương đương IPv4, làm dịch vụ lộ trực tiếp qua IPv6',
      'IPv6 không cần DNS',
      'IPv6 không hỗ trợ HTTPS',
      'IPv6 luôn đi qua NAT nên an toàn hơn',
      'Client IPv4 tự động bị chặn'
    ],
    answer: 0,
    explanation: 'Nhiều hệ thống harden IPv4 nhưng quên rule IPv6, khiến bề mặt tấn công mở lại.'
  },
  {
    id: 'QTM-CALC-01',
    type: 'calc',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Subnetting',
    difficulty: 3,
    question: 'Chia mạng 192.168.10.0/24 cho một VLAN cần ít nhất 50 host. Prefix nhỏ nhất nên dùng là gì và subnet đầu có dải usable nào?',
    options: [],
    answer: '/26; subnet đầu 192.168.10.0/26 có usable 192.168.10.1 - 192.168.10.62, broadcast 192.168.10.63',
    explanation: '50 host cần 6 bit host vì 2^6 - 2 = 62. Prefix là /26.'
  },
  {
    id: 'QTM-FILL-01',
    type: 'fill',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'ACL implicit deny',
    difficulty: 3,
    question: 'Trong ACL, nếu không có dòng permit nào khớp, gói tin sẽ bị chặn bởi ________ ở cuối danh sách.',
    answer: 'implicit deny',
    explanation: 'Deny ngầm cuối ACL là bẫy kinh điển khi thiếu permit cuối hoặc đặt rule sai thứ tự.'
  },
  {
    id: 'QTM-KUBECTL-01',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'kubectl troubleshooting',
    difficulty: 3,
    config: 'kubectl get pods\nNAME        READY   STATUS             RESTARTS\napi-7f9c    0/1     CrashLoopBackOff   7',
    question: 'Lệnh nào nên dùng sớm để xem log ứng dụng trong container?',
    options: ['kubectl logs api-7f9c', 'kubectl delete namespace default', 'docker build .', 'iptables -F', 'kubectl expose node'],
    answer: 0,
    explanation: 'CrashLoopBackOff cần xem logs và describe pod để tìm lỗi command, env, secret, probe hoặc dependency.'
  },
  {
    id: 'QTM-BACKUP-01',
    type: 'short',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Backup cấu hình',
    difficulty: 3,
    question: 'Tự luận: Đề xuất quy trình backup cấu hình router/switch/server theo hướng automation. Nêu cách kiểm chứng backup dùng được.',
    answer: 'Dùng Ansible/SSH hoặc công cụ backup để lấy running-config, version hóa Git/private storage, mã hóa secret, lịch chạy định kỳ, cảnh báo khi diff bất thường. Kiểm chứng bằng restore thử trong lab, checksum, kiểm tra quyền truy cập và tài liệu runbook.',
    explanation: 'Đề vận hành hiện nay thường hỏi cả quy trình, kiểm soát thay đổi và khả năng khôi phục.'
  }
];

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-SUBNET-02',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'VLSM',
    difficulty: 3,
    question: 'Cần chia 10.0.0.0/24 cho các LAN lần lượt 100 host, 50 host, 25 host và 2 host WAN. Thứ tự cấp subnet hợp lý nhất là gì?',
    options: [
      '/25, /26, /27, /30 theo thứ tự nhu cầu giảm dần',
      '/30 trước rồi /27, /26, /25 để tránh lãng phí',
      'Tất cả dùng /24 để dễ quản trị',
      'Chỉ cần /31 cho mọi LAN',
      'Không thể dùng VLSM trên địa chỉ private'
    ],
    answer: 0,
    explanation: 'VLSM nên cấp từ mạng cần nhiều host nhất tới nhỏ nhất để tránh phân mảnh không gian địa chỉ.'
  },
  {
    id: 'QTM-SUBNET-03',
    type: 'calc',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'CIDR',
    difficulty: 3,
    question: 'Subnet 172.16.32.0/20 có dải địa chỉ usable và broadcast là gì?',
    options: [],
    answer: 'Usable 172.16.32.1 - 172.16.47.254; broadcast 172.16.47.255',
    explanation: '/20 tương ứng block size 16 ở octet thứ ba: 32 tới 47 là cùng subnet.'
  },
  {
    id: 'QTM-SUBNET-04',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Default gateway',
    difficulty: 3,
    context: 'PC VLAN 20 có IP 192.168.20.25/24, default gateway 192.168.10.1. SVI VLAN 20 trên core là 192.168.20.1.',
    question: 'Triệu chứng hợp lý nhất là gì?',
    options: [
      'PC có thể ping host cùng VLAN nhưng không đi liên VLAN/Internet đúng cách',
      'PC sẽ tự đổi gateway thành 192.168.20.1',
      'Switch access sẽ xóa VLAN 20',
      'OSPF trên core bắt buộc down',
      'DNS public sẽ sửa được lỗi gateway'
    ],
    answer: 0,
    explanation: 'Default gateway phải cùng subnet với host và trỏ về gateway layer 3 của VLAN đó.'
  },
  {
    id: 'QTM-DHCP-02',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DHCP scope',
    difficulty: 3,
    config: 'ip dhcp excluded-address 192.168.30.1 192.168.30.20\nip dhcp pool VLAN30\n network 192.168.30.0 255.255.255.0\n default-router 192.168.30.254\n dns-server 8.8.8.8',
    question: 'Điểm bất thường dễ gây lỗi vận hành là gì?',
    options: [
      'default-router không trùng với gateway/SVI thường dùng nếu SVI là 192.168.30.1',
      'excluded-address làm DHCP không hoạt động',
      'dns-server không được phép dùng IP public',
      'network /24 không cấp được quá 20 host',
      'DHCP bắt buộc phải chạy trên switch access'
    ],
    answer: 0,
    explanation: 'Nếu gateway thật của VLAN là .1 nhưng DHCP cấp .254, client nhận IP vẫn không ra ngoài đúng.'
  },
  {
    id: 'QTM-DNS-02',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DNS troubleshooting',
    difficulty: 3,
    context: 'Server ping được 8.8.8.8 nhưng không truy cập được bằng tên miền. nslookup báo timeout tới DNS nội bộ.',
    question: 'Hướng kiểm tra đúng trọng tâm nhất là gì?',
    options: [
      'Kiểm tra DNS server, rule UDP/TCP 53, resolver trên host và zone/forwarder',
      'Chỉ kiểm tra dây mạng vì ping IP đã thành công',
      'Xóa default route để ép DNS chạy lại',
      'Bật STP PortFast trên DNS server',
      'Đổi subnet mask thành /30'
    ],
    answer: 0,
    explanation: 'Ping IP thành công chứng minh routing cơ bản ổn; lỗi nằm ở name resolution hoặc firewall cho DNS.'
  },
  {
    id: 'QTM-SW-06',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Router-on-a-stick',
    difficulty: 3,
    config: 'interface Gi0/0.10\n encapsulation dot1Q 10\n ip address 192.168.10.1 255.255.255.0\ninterface Gi0/0.20\n encapsulation dot1Q 20\n ip address 192.168.20.1 255.255.255.0',
    question: 'Điều kiện layer 2 bắt buộc ở cổng switch nối router là gì?',
    options: [
      'Cổng phải là trunk và cho phép VLAN 10,20 đi qua',
      'Cổng phải là access VLAN 1',
      'Cổng phải bật BPDU Guard',
      'Cổng phải tắt dot1Q',
      'Cổng phải dùng port-security sticky'
    ],
    answer: 0,
    explanation: 'Router-on-a-stick dùng subinterface dot1Q, nên link switch-router phải trunk.'
  },
  {
    id: 'QTM-SW-07',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'STP loop',
    difficulty: 3,
    context: 'Hai switch access nối vòng với nhau qua nhiều uplink. Một cổng access bị cấu hình PortFast trunk và BPDU Filter.',
    question: 'Rủi ro lớn nhất là gì?',
    options: [
      'Switch có thể không xử lý BPDU đúng, gây loop layer 2/broadcast storm',
      'OSPF sẽ tự động sửa vòng lặp layer 2',
      'VLAN native tự chuyển về VLAN 999',
      'DHCP server sẽ cấp IP nhanh hơn',
      'EtherChannel tự tạo mà không cần cấu hình'
    ],
    answer: 0,
    explanation: 'BPDU Filter/PortFast dùng sai trên uplink có thể vô hiệu hóa bảo vệ STP và tạo sự cố layer 2 nghiêm trọng.'
  },
  {
    id: 'QTM-SW-08',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Port security',
    difficulty: 3,
    config: 'interface Fa0/12\n switchport mode access\n switchport port-security\n switchport port-security maximum 1\n switchport port-security mac-address sticky\n switchport port-security violation shutdown',
    question: 'Nếu cắm máy khác vào Fa0/12 sau khi đã học sticky MAC, điều gì có khả năng xảy ra?',
    options: [
      'Cổng bị err-disabled do violation shutdown',
      'Switch tự động đổi VLAN cho máy mới',
      'Máy mới được ưu tiên vì MAC mới hơn',
      'Cổng chuyển sang trunk',
      'DHCP relay bị xóa'
    ],
    answer: 0,
    explanation: 'Port security maximum 1 và violation shutdown sẽ khóa cổng khi thấy MAC trái phép.'
  },
  {
    id: 'QTM-SW-09',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'SVI trạng thái down',
    difficulty: 3,
    context: 'Interface Vlan40 đã cấu hình IP nhưng line protocol down. VLAN 40 tồn tại trong database.',
    question: 'Nguyên nhân hợp lý cần kiểm tra là gì?',
    options: [
      'Không có access/trunk port nào thuộc VLAN 40 đang up hoặc VLAN chưa đi qua trunk cần thiết',
      'SVI không bao giờ có line protocol up',
      'Cần cấu hình NAT outside trên SVI',
      'OSPF area chưa là area 0',
      'DNS server không trả lời'
    ],
    answer: 0,
    explanation: 'SVI thường cần VLAN tồn tại và có ít nhất một port trong VLAN đó ở trạng thái active/up.'
  },
  {
    id: 'QTM-OSPF-06',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Router-id trùng',
    difficulty: 3,
    context: 'Hai router OSPF trong cùng domain đều cấu hình router-id 2.2.2.2. Các link layer 3 ping được.',
    question: 'Vấn đề chính là gì?',
    options: [
      'Router-id trùng làm LSDB/neighbor bất ổn và cần đổi unique router-id',
      'OSPF yêu cầu mọi router-id phải giống nhau',
      'Router-id phải thuộc subnet của interface nối trực tiếp',
      'Chỉ ảnh hưởng DHCP, không ảnh hưởng OSPF',
      'Cần bật NAT overload để sửa'
    ],
    answer: 0,
    explanation: 'Router-id là định danh duy nhất trong OSPF domain; trùng ID gây lỗi khó dò.'
  },
  {
    id: 'QTM-OSPF-07',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'OSPF metric',
    difficulty: 3,
    question: 'OSPF mặc định của Cisco tính cost chủ yếu dựa trên yếu tố nào?',
    options: ['Bandwidth của interface', 'Độ trễ ICMP hiện tại', 'Số VLAN đi qua trunk', 'Địa chỉ MAC thấp nhất', 'Số lượng ACL trên router'],
    answer: 0,
    explanation: 'Cisco OSPF cost mặc định dựa trên reference bandwidth chia cho bandwidth interface.'
  },
  {
    id: 'QTM-OSPF-08',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Route filtering',
    difficulty: 3,
    context: 'Một chi nhánh không nhận được route 10.50.0.0/16 qua OSPF nhưng neighbor FULL. Các route khác vẫn có.',
    question: 'Nguyên nhân nào đáng nghi hơn cả?',
    options: [
      'Route bị filter/summarize sai hoặc network statement không đưa prefix đó vào OSPF',
      'Neighbor FULL luôn đồng nghĩa mọi route đều đúng',
      'Không thể quảng bá mạng /16 trong OSPF',
      'OSPF chỉ chạy với địa chỉ public',
      'Switch access chưa bật PortFast'
    ],
    answer: 0,
    explanation: 'Neighbor FULL chỉ nói quan hệ láng giềng ổn; route còn phụ thuộc quảng bá, filter, summary và bảng định tuyến.'
  },
  {
    id: 'QTM-OSPF-09',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Floating static',
    difficulty: 3,
    config: 'ip route 10.99.0.0 255.255.0.0 192.0.2.1 200\nrouter ospf 1\n network 10.0.0.0 0.255.255.255 area 0',
    question: 'Static route có administrative distance 200 thường dùng để làm gì?',
    options: [
      'Làm backup/floating static, chỉ dùng khi route OSPF tốt hơn mất',
      'Luôn ưu tiên hơn OSPF',
      'Cấm router học route động',
      'Tự động tạo VLAN 200',
      'Chỉ định OSPF cost bằng 200'
    ],
    answer: 0,
    explanation: 'OSPF AD là 110; static AD 200 sẽ kém ưu tiên hơn và hoạt động như route dự phòng.'
  },
  {
    id: 'QTM-ACL-03',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'ACL direction',
    difficulty: 3,
    config: 'interface Vlan20\n ip access-group STUDENT-FILTER out',
    question: 'Nếu mục tiêu là lọc traffic do sinh viên gửi ra khỏi VLAN 20 sớm nhất, điểm cần xem lại là gì?',
    options: [
      'Có thể nên đặt ACL inbound trên SVI/access gateway của VLAN 20',
      'ACL direction không ảnh hưởng gì',
      'ACL out luôn lọc packet trước khi router nhận',
      'Extended ACL chỉ được đặt trên cổng vật lý',
      'Không thể lọc VLAN bằng ACL'
    ],
    answer: 0,
    explanation: 'Inbound trên gateway của VLAN nguồn giúp chặn sớm traffic đi vào thiết bị layer 3.'
  },
  {
    id: 'QTM-ACL-04',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Firewall state',
    difficulty: 3,
    context: 'Firewall cho LAN -> Internet outbound TCP 443, nhưng không có rule stateful/return traffic. Người dùng không truy cập web được.',
    question: 'Thiếu sót chính là gì?',
    options: [
      'Thiếu cơ chế cho phép gói phản hồi thuộc phiên đã được thiết lập',
      'HTTPS không dùng TCP',
      'Cần mở inbound 443 từ Internet vào mọi máy LAN',
      'DNS không bao giờ cần firewall',
      'NAT làm mất hết trạng thái phiên'
    ],
    answer: 0,
    explanation: 'Firewall stateful cần cho established/related return traffic; mở inbound rộng là sai hướng.'
  },
  {
    id: 'QTM-NAT-03',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'NAT hairpin',
    difficulty: 3,
    context: 'Client nội bộ truy cập tên miền app.company.com trả về public IP của chính firewall. Từ Internet vào được, từ LAN vào không được.',
    question: 'Khái niệm nào sát nhất cần xem xét?',
    options: ['Hairpin NAT hoặc split DNS', 'STP root bridge', 'DHCP starvation', 'OSPF DR election', 'BPDU Guard'],
    answer: 0,
    explanation: 'Nội bộ gọi public IP quay lại dịch vụ nội bộ cần hairpin NAT hoặc DNS nội bộ trả về private IP.'
  },
  {
    id: 'QTM-NAT-04',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'NAT exemption VPN',
    difficulty: 3,
    context: 'Site-to-site VPN đã up, nhưng traffic LAN A sang LAN B bị NAT overload ra Internet trước khi vào crypto map.',
    question: 'Cấu hình cần bổ sung/kiểm tra là gì?',
    options: [
      'NAT exemption/no-NAT cho traffic đi qua VPN',
      'PortFast trên cổng WAN',
      'DHCP snooping trust',
      'Đổi OSPF sang RIP',
      'Mở FTP passive port'
    ],
    answer: 0,
    explanation: 'Traffic VPN giữa hai private subnet thường phải được loại khỏi NAT overload.'
  },
  {
    id: 'QTM-IPTABLES-02',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'iptables DNAT',
    difficulty: 3,
    config: 'iptables -t nat -A PREROUTING -p tcp --dport 8080 -j DNAT --to-destination 10.10.10.50:80\niptables -t nat -A POSTROUTING -j MASQUERADE',
    question: 'Cấu hình PREROUTING trên làm gì?',
    options: [
      'Chuyển traffic vào port 8080 tới server nội bộ 10.10.10.50 port 80',
      'Chặn toàn bộ traffic TCP 8080',
      'Tạo route OSPF default',
      'Tự động cấp IP cho server',
      'Mã hóa HTTPS cho server'
    ],
    answer: 0,
    explanation: 'DNAT thay đổi đích của gói trước khi định tuyến; thường dùng cho port forwarding.'
  },
  {
    id: 'QTM-LINUX-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'systemd',
    difficulty: 3,
    config: 'systemctl status nginx\nActive: failed (Result: exit-code)\nnginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)',
    question: 'Hướng xử lý đúng nhất là gì?',
    options: [
      'Tìm process đang chiếm port 80 rồi dừng/đổi port hoặc sửa cấu hình nginx',
      'Cài lại kernel ngay lập tức',
      'Xóa toàn bộ /etc/nginx',
      'Tắt DNS vì DNS chiếm port 80',
      'Đổi subnet mask của server'
    ],
    answer: 0,
    explanation: 'Thông báo Address already in use cho biết port đã bị service khác hoặc instance khác chiếm.'
  },
  {
    id: 'QTM-LINUX-02',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'File permission',
    difficulty: 3,
    config: '-rw------- 1 root root 1704 Jun 03 server.key',
    question: 'Permission này phù hợp với file nào nhất?',
    options: ['Private key TLS/VPN', 'File public HTML', 'Log truy cập web công khai', 'Ảnh logo website', 'File DNS zone public bắt buộc world-writable'],
    answer: 0,
    explanation: 'Private key nên hạn chế đọc tối đa, thường chỉ root/service account cần thiết có quyền.'
  },
  {
    id: 'QTM-OPENVPN-02',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'OpenVPN full tunnel',
    difficulty: 3,
    config: 'push "redirect-gateway def1 bypass-dhcp"\npush "dhcp-option DNS 10.8.0.1"',
    question: 'Cấu hình trên thường tạo hành vi nào cho client?',
    options: [
      'Đẩy toàn bộ traffic client đi qua VPN và dùng DNS được push',
      'Chỉ cho client truy cập một subnet nội bộ duy nhất',
      'Tắt mã hóa tunnel để tăng tốc',
      'Chặn client nhận route',
      'Biến server thành DHCP relay layer 2'
    ],
    answer: 0,
    explanation: 'redirect-gateway dùng cho full tunnel; DNS option giúp client phân giải qua DNS được chỉ định.'
  },
  {
    id: 'QTM-SMB-01',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'SMB hardening',
    difficulty: 3,
    question: 'Khi triển khai SMB/NFS/FTP cho đồ án file server, chính sách nào an toàn nhất?',
    options: [
      'Phân quyền theo nhóm, chặn public Internet, log truy cập, dùng TLS/VPN nếu qua mạng không tin cậy',
      'Cho anonymous write để tiện kiểm thử',
      'Mở SMB 445 ra Internet cho mọi người nộp bài',
      'Dùng chung một tài khoản root cho cả lớp',
      'Tắt log để tiết kiệm ổ đĩa'
    ],
    answer: 0,
    explanation: 'File server là nơi dễ rò dữ liệu; đề thường kiểm tra quyền, network exposure và audit.'
  },
  {
    id: 'QTM-ZABBIX-02',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'SNMP',
    difficulty: 3,
    question: 'Vì sao SNMP community string kiểu public/private mặc định là rủi ro?',
    options: [
      'Dễ bị đoán, có thể làm lộ thông tin thiết bị hoặc cho phép ghi cấu hình nếu RW',
      'SNMP không bao giờ dùng trong monitoring',
      'Community string càng phổ biến càng an toàn',
      'Chỉ ảnh hưởng giao diện web, không ảnh hưởng router',
      'Bắt buộc mở ra Internet để Zabbix chạy'
    ],
    answer: 0,
    explanation: 'SNMP cần community mạnh/giới hạn nguồn, ưu tiên SNMPv3 nếu có thể.'
  },
  {
    id: 'QTM-DOCKER-02',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker volume',
    difficulty: 3,
    config: 'services:\n  db:\n    image: mysql:8\n    volumes:\n      - dbdata:/var/lib/mysql\nvolumes:\n  dbdata:',
    question: 'Mục đích chính của volume dbdata là gì?',
    options: [
      'Giữ dữ liệu database bền hơn vòng đời container',
      'Public database ra Internet',
      'Tự động mã hóa mọi query SQL',
      'Đổi image MySQL thành PostgreSQL',
      'Tạo Kubernetes Secret'
    ],
    answer: 0,
    explanation: 'Container có thể bị xóa/tạo lại; volume giúp dữ liệu stateful tồn tại độc lập hơn.'
  },
  {
    id: 'QTM-DOCKER-03',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker secret',
    difficulty: 3,
    context: 'Compose file chứa MYSQL_ROOT_PASSWORD=123456 và được push lên GitHub public.',
    question: 'Lỗi nghiêm trọng nhất là gì?',
    options: [
      'Lộ secret trong mã nguồn; cần dùng secret/env an toàn và rotate mật khẩu',
      'MySQL không hỗ trợ biến môi trường',
      'GitHub tự động mã hóa mật khẩu nên không sao',
      'Chỉ ảnh hưởng giao diện frontend',
      'Cần đổi port 3306 sang 80 là đủ'
    ],
    answer: 0,
    explanation: 'Hardcode secret là lỗi thực tế rất hay gặp khi deploy Docker/cloud.'
  },
  {
    id: 'QTM-K8S-04',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes resource limits',
    difficulty: 3,
    config: 'resources:\n  requests:\n    cpu: "100m"\n    memory: "128Mi"\n  limits:\n    cpu: "500m"\n    memory: "256Mi"',
    question: 'Ý nghĩa đúng nhất của requests và limits là gì?',
    options: [
      'requests phục vụ scheduling tối thiểu; limits giới hạn tài nguyên container được dùng',
      'requests là tài nguyên tối đa, limits là tài nguyên tối thiểu',
      'Hai trường chỉ dùng để đặt password',
      'Chỉ áp dụng cho Service, không áp dụng Pod',
      'Tự động tăng node cloud vô hạn'
    ],
    answer: 0,
    explanation: 'Thi vận hành K8s hay hỏi scheduling, eviction và kiểm soát tài nguyên.'
  },
  {
    id: 'QTM-K8S-05',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes Secret',
    difficulty: 3,
    question: 'Nhận định nào đúng nhất về Kubernetes Secret mặc định?',
    options: [
      'Secret thường được base64 encode, không phải tự động mã hóa end-to-end nếu chưa cấu hình thêm',
      'Secret không bao giờ đọc được bởi Pod',
      'Secret luôn an toàn khi commit vào Git',
      'Secret chỉ dùng cho ảnh PNG',
      'Secret thay thế được firewall'
    ],
    answer: 0,
    explanation: 'Base64 không phải encryption; cần RBAC, encryption at rest, external secret manager và tránh commit secret.'
  },
  {
    id: 'QTM-K8S-06',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Ingress',
    difficulty: 3,
    config: 'rules:\n- host: app.example.com\n  http:\n    paths:\n    - path: /api\n      backend:\n        service:\n          name: api-svc\n          port:\n            number: 80',
    question: 'Ingress rule này route traffic như thế nào?',
    options: [
      'Request host app.example.com path /api được chuyển tới Service api-svc port 80',
      'Mọi traffic TCP bất kỳ được chuyển tới Pod trực tiếp',
      'Tự tạo database cho ứng dụng',
      'Chỉ hoạt động nếu Service là NodePort',
      'Không cần Ingress Controller'
    ],
    answer: 0,
    explanation: 'Ingress cần controller thực thi rule host/path và thường đi qua Service.'
  },
  {
    id: 'QTM-CLOUD-03',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Private subnet',
    difficulty: 3,
    question: 'Trong mô hình cloud 3-tier, database nên đặt ở đâu?',
    options: [
      'Private subnet, không public IP, chỉ cho app tier truy cập port cần thiết',
      'Public subnet với security group any-any',
      'Cùng subnet public với load balancer và mở 3306 toàn Internet',
      'Trên máy client để giảm latency',
      'Trong DNS zone public'
    ],
    answer: 0,
    explanation: 'Thiết kế cloud tốt tách public entrypoint khỏi backend/database private.'
  },
  {
    id: 'QTM-CLOUD-04',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Shared responsibility',
    difficulty: 3,
    question: 'Trong mô hình IaaS cloud, phần nào thường vẫn là trách nhiệm của người dùng?',
    options: [
      'Cấu hình firewall/security group, vá hệ điều hành, quản lý tài khoản và dữ liệu',
      'Thay ổ cứng vật lý trong datacenter',
      'Bảo trì nguồn điện của rack',
      'Sửa firmware switch vật lý của nhà cung cấp',
      'Kiểm soát nhiệt độ phòng máy cloud'
    ],
    answer: 0,
    explanation: 'Cloud provider lo hạ tầng vật lý; người dùng vẫn chịu trách nhiệm cấu hình và bảo mật workload.'
  },
  {
    id: 'QTM-HAPROXY-02',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'HAProxy algorithm',
    difficulty: 3,
    question: 'Khi backend có server mạnh/yếu khác nhau, thuật toán/cấu hình nào nên cân nhắc để phân phối tải hợp lý hơn roundrobin đều?',
    options: ['weight hoặc leastconn tùy loại tải', 'Tắt health check', 'Dùng DNS 8.8.8.8 làm backend', 'Mở toàn bộ port', 'Chỉ dùng một server duy nhất'],
    answer: 0,
    explanation: 'HAProxy có weight và thuật toán như leastconn để phù hợp năng lực backend hoặc phiên dài.'
  },
  {
    id: 'QTM-AUTO-02',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Configuration drift',
    difficulty: 3,
    question: 'Configuration drift trong quản trị hệ thống nghĩa là gì?',
    options: [
      'Cấu hình thực tế lệch dần khỏi trạng thái chuẩn mong muốn do sửa tay/thay đổi không kiểm soát',
      'Router tự học thêm MAC address',
      'DNS trả lời chậm do cache',
      'Ping có jitter cao',
      'Container image bị nén'
    ],
    answer: 0,
    explanation: 'Automation/idempotent và version control giúp phát hiện, giảm và sửa configuration drift.'
  },
  {
    id: 'QTM-AUTO-03',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Change management',
    difficulty: 3,
    question: 'Trước khi thay ACL trên router biên trong giờ học/thi lab, bước nào chuyên nghiệp nhất?',
    options: [
      'Backup cấu hình, xác định rollback, kiểm tra rule ở lab hoặc maintenance window, log thay đổi',
      'Paste toàn bộ ACL mới trực tiếp vào production',
      'Xóa ACL cũ trước khi đọc yêu cầu',
      'Tắt log để tránh rối',
      'Đổi mật khẩu Wi-Fi'
    ],
    answer: 0,
    explanation: 'Đề tự luận vận hành thường chấm tư duy thay đổi an toàn: backup, test, rollback, audit.'
  },
  {
    id: 'QTM-MATCH-02',
    type: 'match',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes objects',
    difficulty: 3,
    question: 'Ghép Kubernetes object với vai trò đúng.',
    answer: [
      ['Deployment', 'Quản lý replica và rollout Pod'],
      ['Service', 'Cấp endpoint ổn định để truy cập Pod'],
      ['Ingress', 'Route HTTP/HTTPS theo host/path'],
      ['ConfigMap', 'Cấu hình không nhạy cảm cho ứng dụng']
    ],
    explanation: 'Nắm vai trò object giúp đọc đề YAML nhanh hơn.'
  },
  {
    id: 'QTM-ESSAY-FINAL-01',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Tự luận đề thi - campus routing',
    difficulty: 3,
    image: {src:'assets/qtm-campus-topology.svg', alt:'Campus topology for final exam essay', caption:'Đề tự luận: campus LAN, DMZ, Edge NAT và OSPF.'},
    question: 'Tự luận cuối kỳ: Dựa vào sơ đồ, hãy thiết kế địa chỉ IP/VLAN cho 3 phòng ban, cấu hình routing liên VLAN, OSPF tới router Edge, NAT ra Internet và ACL cho DMZ web truy cập database. Nêu ít nhất 5 lệnh/nhóm lệnh kiểm tra khi user VLAN 20 không truy cập được web DMZ.',
    answer: 'Bài làm tốt cần có bảng VLAN/subnet/gateway, trunk/access/SVI hoặc router-on-a-stick, OSPF area 0 giữa core-edge, default route ở edge và default-information originate nếu cần, NAT overload cho LAN, static NAT/port-forward cho DMZ nếu public, ACL least privilege giữa DMZ và DB. Lệnh kiểm tra: show vlan brief, show interfaces trunk, show ip interface brief, show ip route, show ip ospf neighbor, show access-lists, show ip nat translations, ping/traceroute, tcpdump/Wireshark nếu ở server.',
    explanation: 'Đây là mẫu tự luận tích hợp đúng kiểu đề khó: switching + routing + firewall + NAT + troubleshoot.'
  },
  {
    id: 'QTM-ESSAY-FINAL-02',
    type: 'short',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Tự luận đề thi - deploy web hiện đại',
    difficulty: 3,
    image: {src:'assets/qtm-cloud-lb.svg', alt:'Cloud Kubernetes final exam topology', caption:'Đề tự luận: LB/Ingress, Service, Pod, database private.'},
    config: 'kubectl get svc\nNAME      TYPE        CLUSTER-IP      PORT(S)\napi-svc   ClusterIP   10.96.10.20     80/TCP\n\nkubectl get endpoints api-svc\nNAME      ENDPOINTS\napi-svc   <none>\n\nPod labels: app=web, tier=api\nService selector: app=api',
    question: 'Tự luận cuối kỳ: Phân tích vì sao người dùng không truy cập được API qua Ingress. Trình bày luồng request chuẩn từ Internet vào Pod, chỉ ra lỗi trong dữ kiện, và đề xuất checklist hardening cho Docker/Kubernetes/cloud.',
    answer: 'Luồng chuẩn: DNS -> Load Balancer/WAF -> Ingress Controller -> Service -> Endpoint/Pod -> app container. Lỗi chính: Service selector app=api không khớp label Pod app=web nên endpoint rỗng. Cần sửa selector hoặc label, kiểm tra ingress rule, service port/targetPort, readinessProbe, log pod, network policy, security group. Hardening: TLS, RBAC, Secret không commit Git, image scan, resource limits, probes, private database, log/monitoring, backup, least privilege network policy.',
    explanation: 'Câu này mô phỏng đề mới hay lấy từ đồ án Docker/Kubernetes/cloud, bắt sinh viên đọc output thật.'
  },
  {
    id: 'QTM-ESSAY-FINAL-03',
    type: 'short',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Tự luận đề thi - VPN và monitoring',
    difficulty: 3,
    config: 'OpenVPN server: 10.8.0.0/24\nLAN nội bộ: 192.168.10.0/24\npush "route 192.168.10.0 255.255.255.0"\niptables default INPUT DROP, FORWARD DROP',
    question: 'Tự luận cuối kỳ: Client VPN kết nối thành công nhưng không truy cập được server LAN 192.168.10.20 và Zabbix không cảnh báo. Hãy phân tích các lớp cần kiểm tra và đề xuất rule firewall/route/monitoring phù hợp.',
    answer: 'Cần kiểm tra route push trên client, IP forwarding trên VPN server, FORWARD rule giữa tun0 và LAN, route ngược từ LAN về 10.8.0.0/24 hoặc NAT phù hợp, DNS nội bộ nếu truy cập bằng tên, ACL trên server đích. Với Zabbix: agent/server connectivity, item/trigger đúng dịch vụ, ngưỡng và duration tránh false positive, cảnh báo qua email/Telegram, dashboard theo VPN tunnel, packet loss, CPU/RAM/disk và service health.',
    explanation: 'Đề kiểu này chấm tư duy lớp mạng, Linux firewall và giám sát thay vì chỉ biết OpenVPN up là xong.'
  }
);

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-DEF-001',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Subnet mask',
    difficulty: 2,
    question: 'Subnet mask dùng để làm gì trong IPv4?',
    options: ['Xác định phần network và phần host của địa chỉ IP', 'Mã hóa gói tin IP', 'Thay thế địa chỉ MAC', 'Tạo mật khẩu Wi-Fi', 'Chọn root bridge STP'],
    answer: 0,
    explanation: 'Subnet mask cho biết bit nào thuộc network, bit nào thuộc host để host/router quyết định đích cùng mạng hay khác mạng.'
  },
  {
    id: 'QTM-DEF-002',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Default gateway',
    difficulty: 2,
    question: 'Default gateway được host dùng trong trường hợp nào?',
    options: ['Gửi gói tới mạng khác subnet local', 'Gửi frame tới host cùng switch cùng subnet', 'Đổi địa chỉ MAC của host', 'Cấp phát DHCP lease', 'Tạo bản ghi DNS A'],
    answer: 0,
    explanation: 'Khi IP đích không cùng subnet, host gửi frame tới MAC của default gateway để router chuyển tiếp.'
  },
  {
    id: 'QTM-DEF-003',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DNS',
    difficulty: 2,
    question: 'Bản ghi DNS loại A có chức năng gì?',
    options: ['Ánh xạ tên miền sang địa chỉ IPv4', 'Ánh xạ tên miền sang địa chỉ MAC', 'Chỉ định VLAN native', 'Cấp phát IP động', 'Tạo OSPF neighbor'],
    answer: 0,
    explanation: 'A record trả về IPv4 cho tên miền; AAAA record trả về IPv6.'
  },
  {
    id: 'QTM-DEF-004',
    type: 'mcq',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'DHCP',
    difficulty: 2,
    question: 'Thứ tự DORA trong DHCP gồm các bước nào?',
    options: ['Discover, Offer, Request, Acknowledge', 'Detect, Open, Route, Access', 'DNS, OSPF, RIP, ARP', 'Drop, Output, Reject, Accept', 'Docker, Overlay, Replica, Apply'],
    answer: 0,
    explanation: 'DORA là quy trình client xin lease IP từ DHCP server.'
  },
  {
    id: 'QTM-DEF-005',
    type: 'fill',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'IPv6',
    difficulty: 2,
    question: 'Bản ghi DNS ánh xạ tên miền sang địa chỉ IPv6 là ________.',
    answer: 'AAAA',
    explanation: 'A dùng cho IPv4, AAAA dùng cho IPv6.'
  },
  {
    id: 'QTM-DEF-006',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'VLAN',
    difficulty: 2,
    question: 'VLAN chủ yếu giúp đạt mục tiêu nào?',
    options: ['Chia một switch layer 2 thành nhiều broadcast domain logic', 'Tăng độ dài cáp Ethernet', 'Mã hóa toàn bộ frame', 'Thay thế router trong mọi trường hợp', 'Cấp phát DNS tự động'],
    answer: 0,
    explanation: 'VLAN tách broadcast domain, giúp phân đoạn mạng theo phòng ban/dịch vụ.'
  },
  {
    id: 'QTM-DEF-007',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Access port',
    difficulty: 2,
    question: 'Access port thường dùng để nối với thiết bị nào?',
    options: ['PC, printer, camera hoặc endpoint thuộc một VLAN', 'Uplink mang nhiều VLAN giữa switch', 'Kết nối WAN PPPoE', 'Kết nối BGP Internet', 'Kết nối console serial'],
    answer: 0,
    explanation: 'Access port gắn endpoint vào một VLAN cụ thể; trunk dùng để mang nhiều VLAN.'
  },
  {
    id: 'QTM-DEF-008',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Trunk',
    difficulty: 2,
    question: 'Trunk port dùng chuẩn 802.1Q để làm gì?',
    options: ['Gắn tag VLAN để mang nhiều VLAN trên một link', 'Chặn mọi broadcast', 'Cấp địa chỉ IP cho client', 'Tạo certificate VPN', 'Đổi TCP thành UDP'],
    answer: 0,
    explanation: '802.1Q thêm VLAN tag vào frame để switch hai đầu biết frame thuộc VLAN nào.'
  },
  {
    id: 'QTM-DEF-009',
    type: 'mcq',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'STP',
    difficulty: 2,
    question: 'Mục tiêu chính của Spanning Tree Protocol là gì?',
    options: ['Ngăn loop layer 2 trong mạng switch dự phòng đường', 'Mã hóa traffic VLAN', 'Tính subnet mask', 'Cấp phát DHCP', 'Nén file backup'],
    answer: 0,
    explanation: 'STP khóa một số port dự phòng để tránh broadcast storm khi có vòng lặp layer 2.'
  },
  {
    id: 'QTM-DEF-010',
    type: 'fill',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'STP',
    difficulty: 2,
    question: 'Trong STP, switch có Bridge ID thấp nhất sẽ trở thành ________.',
    answer: 'root bridge',
    explanation: 'Bridge ID gồm priority và MAC address; giá trị thấp nhất thắng.'
  },
  {
    id: 'QTM-DEF-011',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Static route',
    difficulty: 2,
    question: 'Static route phù hợp nhất trong tình huống nào?',
    options: ['Mạng nhỏ hoặc route mặc định đơn giản, ít thay đổi', 'Mạng lớn thay đổi liên tục với nhiều đường dự phòng', 'Khi không cần bảng định tuyến', 'Chỉ dùng cho switch layer 2', 'Chỉ dùng trong Kubernetes'],
    answer: 0,
    explanation: 'Static route dễ hiểu nhưng khó mở rộng khi topology phức tạp.'
  },
  {
    id: 'QTM-DEF-012',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Dynamic routing',
    difficulty: 2,
    question: 'Ưu điểm chính của định tuyến động so với static route là gì?',
    options: ['Tự học và cập nhật route khi topology thay đổi', 'Không cần router', 'Không bao giờ cần cấu hình', 'Luôn nhanh hơn switch layer 2', 'Tự động mã hóa dữ liệu'],
    answer: 0,
    explanation: 'Dynamic routing như OSPF giúp mạng thích nghi với thay đổi và sự cố đường truyền.'
  },
  {
    id: 'QTM-DEF-013',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'OSPF area 0',
    difficulty: 2,
    question: 'Trong OSPF nhiều area, area 0 thường đóng vai trò gì?',
    options: ['Backbone area kết nối các area khác', 'VLAN native mặc định', 'DHCP scope chính', 'Port quản trị SSH', 'Docker bridge network'],
    answer: 0,
    explanation: 'Thiết kế OSPF multi-area thường yêu cầu các area khác kết nối về backbone area 0.'
  },
  {
    id: 'QTM-DEF-014',
    type: 'mcq',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'OSPF neighbor',
    difficulty: 2,
    question: 'Lệnh nào thường dùng để kiểm tra trạng thái láng giềng OSPF trên Cisco?',
    options: ['show ip ospf neighbor', 'show vlan brief', 'show mac address-table', 'show running docker', 'kubectl get pods'],
    answer: 0,
    explanation: 'show ip ospf neighbor cho biết router láng giềng, state và interface OSPF.'
  },
  {
    id: 'QTM-DEF-015',
    type: 'fill',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'OSPF route code',
    difficulty: 2,
    question: 'Trong bảng định tuyến Cisco, ký hiệu route học từ OSPF thường bắt đầu bằng chữ ________.',
    answer: 'O',
    explanation: 'O là OSPF intra-area, O IA là OSPF inter-area.'
  },
  {
    id: 'QTM-DEF-016',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'ACL',
    difficulty: 2,
    question: 'ACL trên router/firewall được dùng chủ yếu để làm gì?',
    options: ['Cho phép hoặc chặn traffic theo điều kiện', 'Tăng dung lượng ổ cứng', 'Cấp IP DHCP', 'Tạo VLAN tag', 'Build container image'],
    answer: 0,
    explanation: 'ACL lọc gói theo nguồn, đích, giao thức, port hoặc các điều kiện khác tùy loại ACL.'
  },
  {
    id: 'QTM-DEF-017',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Standard ACL',
    difficulty: 2,
    question: 'Standard ACL của Cisco thường lọc dựa trên thông tin nào?',
    options: ['Địa chỉ IP nguồn', 'Địa chỉ IP nguồn, đích và port', 'URL HTTP đầy đủ', 'Nội dung file tải xuống', 'Tên container'],
    answer: 0,
    explanation: 'Standard ACL chủ yếu xét source IP, nên thường đặt gần đích để tránh chặn nhầm.'
  },
  {
    id: 'QTM-DEF-018',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Extended ACL',
    difficulty: 2,
    question: 'Extended ACL khác standard ACL ở điểm nào?',
    options: ['Có thể lọc theo nguồn, đích, giao thức và port', 'Chỉ lọc theo MAC address', 'Chỉ dùng cho Wi-Fi', 'Không có implicit deny', 'Không cần thứ tự rule'],
    answer: 0,
    explanation: 'Extended ACL chi tiết hơn, vì vậy hay đặt gần nguồn để chặn sớm traffic không mong muốn.'
  },
  {
    id: 'QTM-DEF-019',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'NAT',
    difficulty: 2,
    question: 'NAT overload/PAT cho phép điều gì?',
    options: ['Nhiều host nội bộ dùng chung một IP public bằng cách phân biệt port', 'Một switch có nhiều root bridge', 'Một DNS record có nhiều tên', 'Một Pod có nhiều image', 'Một VLAN đi qua Wi-Fi'],
    answer: 0,
    explanation: 'PAT là kiểu NAT phổ biến cho LAN ra Internet qua một địa chỉ public.'
  },
  {
    id: 'QTM-DEF-020',
    type: 'mcq',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'DMZ',
    difficulty: 2,
    question: 'DMZ trong thiết kế mạng thường dùng để đặt loại server nào?',
    options: ['Server cần public có kiểm soát như web/reverse proxy/VPN portal', 'Database nhân sự mở trực tiếp Internet', 'Máy cá nhân của toàn bộ nhân viên', 'Root bridge STP', 'DHCP client'],
    answer: 0,
    explanation: 'DMZ tách server public khỏi LAN nhạy cảm, giảm rủi ro khi server public bị tấn công.'
  },
  {
    id: 'QTM-DEF-021',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'SSH',
    difficulty: 2,
    question: 'SSH thường dùng để làm gì trong quản trị Linux/server?',
    options: ['Đăng nhập quản trị từ xa qua kênh mã hóa', 'Cấp IP động cho client', 'Tạo VLAN trunk', 'Chia tải HTTP', 'Tạo bản ghi DNS'],
    answer: 0,
    explanation: 'SSH thay thế Telnet vì có mã hóa và xác thực tốt hơn.'
  },
  {
    id: 'QTM-DEF-022',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'NFS',
    difficulty: 2,
    question: 'NFS thường dùng để làm gì?',
    options: ['Chia sẻ thư mục/file giữa các hệ thống Unix/Linux', 'Mở web HTTPS', 'Cấp IP DHCP', 'Cân bằng tải layer 7', 'Tạo OSPF area'],
    answer: 0,
    explanation: 'NFS là dịch vụ chia sẻ file phổ biến trong môi trường Unix/Linux.'
  },
  {
    id: 'QTM-DEF-023',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'SMB',
    difficulty: 2,
    question: 'SMB/CIFS thường gắn với nhu cầu nào?',
    options: ['Chia sẻ file/máy in trong môi trường Windows hoặc AD', 'Tạo tunnel VPN layer 3', 'Chọn OSPF DR', 'Đóng gói Docker image', 'Kiểm tra readinessProbe'],
    answer: 0,
    explanation: 'SMB là giao thức chia sẻ file phổ biến trên Windows và tích hợp tốt với AD.'
  },
  {
    id: 'QTM-DEF-024',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'FTP',
    difficulty: 2,
    question: 'Khi public FTP, điểm nào cần chú ý về firewall?',
    options: ['Port control và dải passive port nếu dùng passive mode', 'Chỉ cần mở ICMP', 'FTP chỉ dùng UDP 53', 'Không cần xác thực', 'Bắt buộc mở SMB 445'],
    answer: 0,
    explanation: 'FTP có control/data connection; passive mode cần cấu hình và mở dải port phù hợp.'
  },
  {
    id: 'QTM-DEF-025',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'OpenVPN',
    difficulty: 2,
    question: 'OpenVPN chủ yếu giải quyết nhu cầu nào?',
    options: ['Tạo kết nối bảo mật cho client/site truy cập mạng riêng qua Internet', 'Chia VLAN trong switch', 'Build image container', 'Tự động chọn STP root', 'Tạo DHCP Discover'],
    answer: 0,
    explanation: 'OpenVPN tạo tunnel bảo mật, thường dùng cho remote access hoặc site-to-site tùy cấu hình.'
  },
  {
    id: 'QTM-DEF-026',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Zabbix',
    difficulty: 2,
    question: 'Zabbix dùng để làm gì trong quản trị mạng/hệ thống?',
    options: ['Giám sát host, service, metric và cảnh báo sự cố', 'Chia subnet tự động', 'Thay thế hoàn toàn firewall', 'Tạo VLAN tag', 'Cấp chứng chỉ TLS'],
    answer: 0,
    explanation: 'Zabbix thu thập metric/log/trạng thái và tạo trigger/cảnh báo để phát hiện sự cố.'
  },
  {
    id: 'QTM-DEF-027',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'AD DS',
    difficulty: 2,
    question: 'Active Directory Domain Services chủ yếu cung cấp chức năng nào?',
    options: ['Quản lý danh tính, xác thực, domain, user/group và policy tập trung', 'Cân bằng tải HTTP', 'Chia subnet IPv4', 'Tạo container image', 'Tự động NAT port'],
    answer: 0,
    explanation: 'AD DS là nền tảng quản lý identity và policy phổ biến trong môi trường Windows domain.'
  },
  {
    id: 'QTM-DEF-028',
    type: 'mcq',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Apache Guacamole',
    difficulty: 2,
    question: 'Apache Guacamole thường được dùng để làm gì?',
    options: ['Truy cập SSH/RDP/VNC qua trình duyệt web', 'Chạy OSPF trên router', 'Cấp IP DHCP', 'Tạo root bridge STP', 'Quét virus endpoint'],
    answer: 0,
    explanation: 'Guacamole là remote access gateway không cần client native, nhưng cần hardening xác thực và phân quyền.'
  },
  {
    id: 'QTM-DEF-029',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker image',
    difficulty: 2,
    question: 'Docker image là gì?',
    options: ['Mẫu đóng gói ứng dụng và dependency để tạo container', 'Máy ảo đầy đủ có kernel riêng bắt buộc', 'Một VLAN ID', 'Một bản ghi DNS', 'Một ACL firewall'],
    answer: 0,
    explanation: 'Image là artifact bất biến tương đối; container là instance chạy từ image.'
  },
  {
    id: 'QTM-DEF-030',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker container',
    difficulty: 2,
    question: 'Container khác image ở điểm nào?',
    options: ['Container là phiên bản đang chạy/được tạo từ image', 'Container là file cấu hình DNS', 'Container luôn nặng hơn máy ảo', 'Image chỉ chạy trong switch', 'Image là địa chỉ IP public'],
    answer: 0,
    explanation: 'Có thể tạo nhiều container từ cùng một image.'
  },
  {
    id: 'QTM-DEF-031',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Docker Compose',
    difficulty: 2,
    question: 'Docker Compose phù hợp nhất để làm gì?',
    options: ['Mô tả và chạy nhiều service container bằng file YAML', 'Cấu hình OSPF area', 'Chọn root bridge', 'Tạo DHCP lease', 'Gắn VLAN tag cho frame'],
    answer: 0,
    explanation: 'Compose giúp định nghĩa service, network, volume, env trong một file để triển khai local/lab tiện hơn.'
  },
  {
    id: 'QTM-DEF-032',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes Pod',
    difficulty: 2,
    question: 'Pod trong Kubernetes là gì?',
    options: ['Đơn vị triển khai nhỏ nhất, chứa một hoặc vài container chia sẻ network namespace', 'Một DNS public zone', 'Một switch layer 2', 'Một route static', 'Một firewall rule'],
    answer: 0,
    explanation: 'Pod thường chứa một container chính và có IP riêng trong cluster.'
  },
  {
    id: 'QTM-DEF-033',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes Deployment',
    difficulty: 2,
    question: 'Deployment trong Kubernetes thường quản lý điều gì?',
    options: ['Replica, rollout và cập nhật Pod', 'Địa chỉ MAC của switch', 'NAT overload trên router', 'Dải DHCP excluded', 'Root CA của VPN'],
    answer: 0,
    explanation: 'Deployment quản lý ReplicaSet và rollout/rollback ứng dụng stateless.'
  },
  {
    id: 'QTM-DEF-034',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Kubernetes Service',
    difficulty: 2,
    question: 'Service trong Kubernetes giải quyết vấn đề gì?',
    options: ['Cung cấp endpoint ổn định để truy cập nhóm Pod thay đổi', 'Mã hóa ổ đĩa host', 'Cấp IP cho switch', 'Chọn default gateway cho PC', 'Tạo VLAN native'],
    answer: 0,
    explanation: 'Pod có thể thay đổi IP; Service dùng selector để cân bằng tới Pod phù hợp.'
  },
  {
    id: 'QTM-DEF-035',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Ingress',
    difficulty: 2,
    question: 'Ingress trong Kubernetes thường dùng cho việc gì?',
    options: ['Route HTTP/HTTPS từ ngoài vào Service theo host/path', 'Cấp phát DHCP', 'Chạy STP', 'Tạo OSPF neighbor', 'Mount NFS trên Linux'],
    answer: 0,
    explanation: 'Ingress cần Ingress Controller để thực thi rule HTTP/HTTPS.'
  },
  {
    id: 'QTM-DEF-036',
    type: 'mcq',
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    topic: 'Cloud security group',
    difficulty: 2,
    question: 'Security group trong cloud gần giống thành phần nào?',
    options: ['Firewall stateful ở mức instance/service', 'DHCP server', 'DNS zone', 'Bridge ID', 'Docker volume'],
    answer: 0,
    explanation: 'Security group kiểm soát inbound/outbound cho tài nguyên cloud.'
  },
  {
    id: 'QTM-DEF-037',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'HAProxy',
    difficulty: 2,
    question: 'HAProxy thường dùng để làm gì?',
    options: ['Cân bằng tải/reverse proxy TCP hoặc HTTP', 'Cấp IP DHCP', 'Tạo VLAN', 'Build image Docker', 'Quản lý user AD'],
    answer: 0,
    explanation: 'HAProxy phân phối request tới nhiều backend và có health check.'
  },
  {
    id: 'QTM-DEF-038',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Health check',
    difficulty: 2,
    question: 'Health check trong load balancer dùng để làm gì?',
    options: ['Kiểm tra backend còn sẵn sàng nhận traffic hay không', 'Đo chiều dài dây mạng', 'Tạo subnet mask', 'Cấp certificate client VPN', 'Đổi VLAN native'],
    answer: 0,
    explanation: 'Health check giúp load balancer tránh gửi traffic tới backend lỗi.'
  },
  {
    id: 'QTM-DEF-039',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Ansible',
    difficulty: 2,
    question: 'Ansible thường được dùng trong quản trị hệ thống để làm gì?',
    options: ['Tự động hóa cấu hình, cài đặt và triển khai qua playbook', 'Chia VLAN bằng STP', 'Thay thế DNS', 'Tạo MAC address mới', 'Cấp DHCP lease'],
    answer: 0,
    explanation: 'Ansible giúp chạy tác vụ lặp lại trên nhiều host một cách có kiểm soát.'
  },
  {
    id: 'QTM-DEF-040',
    type: 'mcq',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Backup',
    difficulty: 2,
    question: 'Backup cấu hình router/switch nên lưu thêm thông tin gì để dễ khôi phục?',
    options: ['Thời điểm, thiết bị, version, người thay đổi và bản cấu hình có thể restore', 'Chỉ tên màu dây mạng', 'Chỉ địa chỉ MAC của PC', 'Chỉ ảnh chụp màn hình desktop', 'Chỉ password dạng plaintext'],
    answer: 0,
    explanation: 'Backup có metadata và quy trình restore giúp xử lý sự cố nhanh hơn.'
  },
  {
    id: 'QTM-MATCH-03',
    type: 'match',
    lesson: 'QTM 7 - Automation & vận hành',
    topic: 'Lệnh kiểm tra',
    difficulty: 2,
    question: 'Ghép lệnh với mục đích kiểm tra phù hợp.',
    answer: [
      ['show vlan brief', 'Xem VLAN và port access'],
      ['show interfaces trunk', 'Xem trunk và allowed VLAN'],
      ['show ip route', 'Xem bảng định tuyến'],
      ['kubectl get pods', 'Xem trạng thái Pod trong Kubernetes']
    ],
    explanation: 'Đây là các lệnh thực hành hay xuất hiện trong bài troubleshoot.'
  },
  {
    id: 'QTM-MATCH-04',
    type: 'match',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Dịch vụ và port',
    difficulty: 2,
    question: 'Ghép dịch vụ với port mặc định thường gặp.',
    answer: [
      ['SSH', '22/TCP'],
      ['DNS', '53/UDP hoặc TCP'],
      ['HTTP', '80/TCP'],
      ['HTTPS', '443/TCP']
    ],
    explanation: 'Nắm port mặc định giúp đọc ACL/firewall nhanh hơn.'
  }
);

const NETWORK_CONCEPT_DRILL_QUESTIONS = [
  ['QTM-DRILL-VLAN-01','QTM 2 - Switching, VLAN, STP','VLAN','Thiết bị ở hai VLAN khác nhau muốn giao tiếp bình thường cần thành phần nào?','Thiết bị layer 3 như router hoặc switch L3 để định tuyến liên VLAN',['Chỉ cần cùng switch vật lý','Chỉ cần cùng native VLAN','Chỉ cần cùng địa chỉ MAC','Chỉ cần tắt STP']],
  ['QTM-DRILL-VLAN-02','QTM 2 - Switching, VLAN, STP','Trunk','Nếu trunk thiếu VLAN 20 trong allowed list, hiện tượng nào dễ xảy ra?','Traffic VLAN 20 không đi qua link trunk đó',['Tất cả VLAN đều tự động bị xóa','VLAN 20 được ưu tiên hơn','Router tự tạo route cho VLAN 20','DHCP luôn sửa được lỗi']],
  ['QTM-DRILL-VLAN-03','QTM 2 - Switching, VLAN, STP','Native VLAN','Frame thuộc native VLAN trên trunk 802.1Q thường được xử lý thế nào?','Thường đi không gắn tag VLAN',['Luôn bị drop','Luôn bị mã hóa','Luôn chuyển sang VLAN 1 ở mọi trường hợp','Luôn dùng port TCP 802.1']],
  ['QTM-DRILL-STP-01','QTM 2 - Switching, VLAN, STP','STP','BPDU trong STP dùng để làm gì?','Trao đổi thông tin để bầu root bridge và tính toán topology không loop',['Cấp IP cho host','Phân giải tên miền','Mã hóa frame Ethernet','Kiểm tra HTTP health']],
  ['QTM-DRILL-STP-02','QTM 2 - Switching, VLAN, STP','PortFast','Vì sao PortFast không nên bật bừa trên uplink giữa switch?','Có thể làm tăng rủi ro loop nếu dùng sai vị trí',['Vì PortFast làm cổng chậm hơn','Vì PortFast chỉ dành cho router OSPF','Vì PortFast xóa VLAN database','Vì PortFast tắt DHCP']],
  ['QTM-DRILL-STP-03','QTM 2 - Switching, VLAN, STP','BPDU Guard','BPDU Guard thường dùng để bảo vệ cổng nào?','Cổng access nối endpoint, tránh bị cắm switch lạ',['Cổng uplink core bắt buộc','Cổng WAN Internet','Cổng console','Cổng loopback router']],
  ['QTM-DRILL-ETHER-01','QTM 2 - Switching, VLAN, STP','EtherChannel','LACP dùng cặp mode nào?','active/passive',['desirable/auto','root/backup','inside/outside','master/worker']],
  ['QTM-DRILL-ETHER-02','QTM 2 - Switching, VLAN, STP','EtherChannel','Điều kiện quan trọng khi gom EtherChannel là gì?','Các member port phải khớp tốc độ, duplex và cấu hình VLAN/trunk chính',['Mỗi port phải khác VLAN hoàn toàn','Một port phải là routed port, một port access','Không cần khớp gì cả','Bắt buộc chạy DHCP trên port-channel']],
  ['QTM-DRILL-IP-01','QTM 1 - IP, subnet, dịch vụ nền','ARP','ARP dùng để làm gì trong IPv4 LAN?','Tìm MAC address tương ứng với IPv4 trong cùng mạng local',['Tìm DNS server public','Tạo route OSPF','Cấp phát IP lease','Mã hóa gói tin']],
  ['QTM-DRILL-IP-02','QTM 1 - IP, subnet, dịch vụ nền','ICMP','Ping thường dùng giao thức nào?','ICMP',['TCP 80','UDP 53','OSPF 89','GRE']],
  ['QTM-DRILL-IP-03','QTM 1 - IP, subnet, dịch vụ nền','CIDR','/24 tương ứng subnet mask nào?','255.255.255.0',['255.255.0.0','255.255.255.252','255.255.255.128','255.0.0.0']],
  ['QTM-DRILL-IP-04','QTM 1 - IP, subnet, dịch vụ nền','CIDR','/30 thường phù hợp cho loại link nào?','Point-to-point cần 2 địa chỉ usable',['LAN 200 host','Wi-Fi guest lớn','Database cluster 100 node','VLAN user toàn khoa']],
  ['QTM-DRILL-DHCP-01','QTM 1 - IP, subnet, dịch vụ nền','DHCP relay','Vì sao client khác VLAN với DHCP server cần relay?','DHCP Discover là broadcast layer 2 không tự đi qua router',['Vì DHCP chỉ chạy trên IPv6','Vì DHCP cần OSPF area 0','Vì switch không có MAC table','Vì DNS bắt buộc nằm cùng VLAN']],
  ['QTM-DRILL-DNS-01','QTM 1 - IP, subnet, dịch vụ nền','DNS','Bản ghi CNAME dùng để làm gì?','Tạo alias tên miền trỏ tới tên canonical khác',['Trỏ tên tới MAC address','Cấp IP động','Chọn root bridge','Mở port firewall']],
  ['QTM-DRILL-DNS-02','QTM 1 - IP, subnet, dịch vụ nền','DNS','Bản ghi MX liên quan tới dịch vụ nào?','Email/mail server',['Web static','OSPF routing','Docker volume','STP']],
  ['QTM-DRILL-OSPF-01','QTM 3 - OSPF & định tuyến','OSPF','OSPF thuộc nhóm giao thức định tuyến nào?','Link-state',['Distance-vector thuần túy như RIP','Application layer proxy','Layer 2 switching','File sharing']],
  ['QTM-DRILL-OSPF-02','QTM 3 - OSPF & định tuyến','OSPF','Giao thức IP number của OSPF là bao nhiêu?','89',['80','53','443','22']],
  ['QTM-DRILL-OSPF-03','QTM 3 - OSPF & định tuyến','OSPF','Router-id OSPF dùng để làm gì?','Định danh duy nhất router trong OSPF domain',['Làm default gateway cho PC','Làm mật khẩu OSPF','Làm địa chỉ DNS','Làm VLAN ID']],
  ['QTM-DRILL-OSPF-04','QTM 3 - OSPF & định tuyến','OSPF','Nếu OSPF neighbor stuck ở 2-WAY trên mạng broadcast, trường hợp nào có thể bình thường?','Router không phải DR/BDR có thể chỉ FULL với DR/BDR',['Mọi neighbor đều bắt buộc FULL với mọi router','OSPF không chạy được trên broadcast','Cần tắt IP routing','Cần đổi sang VLAN 1']],
  ['QTM-DRILL-ROUTE-01','QTM 3 - OSPF & định tuyến','Default route','Default route 0.0.0.0/0 dùng khi nào?','Khi không có route cụ thể hơn tới đích',['Khi đích cùng subnet','Khi ping loopback','Khi STP cần root bridge','Khi DNS trả NXDOMAIN']],
  ['QTM-DRILL-ROUTE-02','QTM 3 - OSPF & định tuyến','Longest prefix','Router chọn route theo nguyên tắc nào trước tiên?','Longest prefix match',['Metric cao nhất luôn thắng','Route mới nhất luôn thắng','Tên interface alphabet nhỏ nhất','MAC address thấp nhất']],
  ['QTM-DRILL-ACL-01','QTM 4 - ACL, NAT, firewall','ACL','ACL được xử lý theo thứ tự nào?','Từ trên xuống, match đầu tiên có hiệu lực',['Từ dưới lên','Ngẫu nhiên','Theo độ dài comment','Theo thời gian tạo interface']],
  ['QTM-DRILL-ACL-02','QTM 4 - ACL, NAT, firewall','ACL','Wildcard mask 0.0.0.0 trong ACL nghĩa là gì?','Phải khớp chính xác host đó',['Khớp mọi địa chỉ','Khớp một mạng /24','Chỉ khớp broadcast','Chỉ khớp multicast']],
  ['QTM-DRILL-ACL-03','QTM 4 - ACL, NAT, firewall','ACL','Wildcard mask 0.0.0.255 thường tương ứng phạm vi nào?','Một mạng /24',['Một host duy nhất','Toàn Internet','Một mạng /30','Chỉ địa chỉ multicast']],
  ['QTM-DRILL-NAT-01','QTM 4 - ACL, NAT, firewall','NAT','Inside local trong NAT là gì?','Địa chỉ private thật của host nội bộ trước khi NAT',['IP public sau NAT','IP của DNS server','MAC của switch','Port TCP sau PAT']],
  ['QTM-DRILL-NAT-02','QTM 4 - ACL, NAT, firewall','NAT','Static NAT thường dùng cho nhu cầu nào?','Public một dịch vụ nội bộ bằng ánh xạ cố định',['Cấp IP động cho client','Bầu root bridge','Tạo Pod replica','Mount NFS']],
  ['QTM-DRILL-FW-01','QTM 4 - ACL, NAT, firewall','Firewall','Default deny nghĩa là gì?','Mặc định chặn, chỉ mở những luồng được cho phép rõ ràng',['Mặc định mở hết cho dễ truy cập','Chỉ chặn DNS','Chỉ chặn ICMP','Không cần log']],
  ['QTM-DRILL-FW-02','QTM 4 - ACL, NAT, firewall','Firewall','Stateful firewall theo dõi thông tin gì?','Trạng thái phiên/kết nối để cho phép gói phản hồi hợp lệ',['Tên file tải xuống duy nhất','Màu dây mạng','Số VLAN trong switch','Tên repository GitHub']],
  ['QTM-DRILL-VPN-01','QTM 5 - Linux server, VPN, giám sát','VPN','Split tunnel VPN nghĩa là gì?','Chỉ một số mạng đi qua VPN, traffic khác đi trực tiếp Internet',['Toàn bộ traffic bắt buộc qua VPN','Không có mã hóa','Chỉ dùng cho FTP','Chỉ dùng cho STP']],
  ['QTM-DRILL-VPN-02','QTM 5 - Linux server, VPN, giám sát','VPN','Full tunnel VPN nghĩa là gì?','Toàn bộ traffic client đi qua VPN theo default route được đẩy',['Chỉ DNS đi qua VPN','Chỉ route LAN nội bộ đi qua VPN','Không có route nào đi qua VPN','Chỉ ping đi qua VPN']],
  ['QTM-DRILL-LINUX-01','QTM 5 - Linux server, VPN, giám sát','Linux','Lệnh systemctl dùng phổ biến để làm gì?','Quản lý service systemd như start/stop/status/enable',['Chia subnet','Tạo VLAN tag','Bầu root bridge','Build Docker image duy nhất']],
  ['QTM-DRILL-LINUX-02','QTM 5 - Linux server, VPN, giám sát','Linux','Lệnh ss -tulpn thường giúp kiểm tra gì?','Port TCP/UDP đang listen và process liên quan',['Bridge ID STP','Bản ghi DNS MX','CIDR của VLAN','Lịch backup Git']],
  ['QTM-DRILL-LINUX-03','QTM 5 - Linux server, VPN, giám sát','Linux','Log hệ thống Linux thường xem bằng công cụ nào trên systemd?','journalctl',['kubectl expose','show vlan brief','ip nat outside','docker buildx only']],
  ['QTM-DRILL-ZABBIX-01','QTM 5 - Linux server, VPN, giám sát','Zabbix','Item trong Zabbix là gì?','Đối tượng/metric được thu thập từ host',['Rule firewall','VLAN tag','Docker image','OSPF LSA']],
  ['QTM-DRILL-ZABBIX-02','QTM 5 - Linux server, VPN, giám sát','Zabbix','Trigger trong Zabbix dùng để làm gì?','Định nghĩa điều kiện phát sinh cảnh báo',['Cấp IP động','Mount file share','Tạo service Kubernetes','Chọn root bridge']],
  ['QTM-DRILL-AD-01','QTM 5 - Linux server, VPN, giám sát','AD DS','Group Policy trong AD thường dùng để làm gì?','Áp chính sách cấu hình/bảo mật tập trung cho user/máy',['Cân bằng tải HTTP','Cấp route OSPF','Đóng gói container','Tạo NAT overload']],
  ['QTM-DRILL-DOCKER-01','QTM 6 - Docker, Kubernetes, cloud','Docker','Dockerfile dùng để làm gì?','Mô tả các bước build Docker image',['Chạy OSPF','Tạo VLAN trunk','Cấp DHCP lease','Bầu root bridge']],
  ['QTM-DRILL-DOCKER-02','QTM 6 - Docker, Kubernetes, cloud','Docker','Docker network bridge mặc định phục vụ mục đích gì?','Cho container giao tiếp qua mạng bridge trên host',['Tạo VPN site-to-site','Tạo STP root','Cấp DNS public zone','Thay thế firewall cloud']],
  ['QTM-DRILL-DOCKER-03','QTM 6 - Docker, Kubernetes, cloud','Docker','Bind mount khác volume ở điểm nào thường gặp?','Bind mount gắn trực tiếp đường dẫn host vào container',['Bind mount luôn public Internet','Volume không lưu dữ liệu','Bind mount chỉ dùng cho OSPF','Volume là VLAN tag']],
  ['QTM-DRILL-K8S-01','QTM 6 - Docker, Kubernetes, cloud','Kubernetes','Node trong Kubernetes là gì?','Máy worker/control-plane chạy Pod và thành phần cluster',['Một DNS record','Một VLAN native','Một ACL line','Một file backup']],
  ['QTM-DRILL-K8S-02','QTM 6 - Docker, Kubernetes, cloud','Kubernetes','ReplicaSet đảm bảo điều gì?','Số lượng Pod replica mong muốn đang chạy',['Địa chỉ IP public cố định','DNS MX record','Root bridge STP','DHCP excluded-address']],
  ['QTM-DRILL-K8S-03','QTM 6 - Docker, Kubernetes, cloud','Kubernetes','ConfigMap nên chứa loại dữ liệu nào?','Cấu hình không nhạy cảm',['Password database plaintext','Private key VPN','Token admin cloud','Secret production']],
  ['QTM-DRILL-K8S-04','QTM 6 - Docker, Kubernetes, cloud','Kubernetes','NetworkPolicy trong Kubernetes dùng để làm gì?','Kiểm soát traffic vào/ra Pod theo policy',['Build image','Cấp IP DHCP cho PC','Chọn root bridge','Tạo DNS MX']],
  ['QTM-DRILL-CLOUD-01','QTM 6 - Docker, Kubernetes, cloud','Cloud','Load Balancer public thường đặt ở lớp nào của mô hình cloud web?','Lớp entrypoint/public subnet trước app backend',['Trong database private subnet mở public','Trên laptop client','Trong DNS resolver local','Trong switch access']],
  ['QTM-DRILL-CLOUD-02','QTM 6 - Docker, Kubernetes, cloud','Cloud','Bastion host dùng để làm gì?','Điểm nhảy quản trị có kiểm soát vào private subnet',['Chạy DNS public bắt buộc','Thay thế database','Cấp DHCP cho Internet','Tắt toàn bộ log']],
  ['QTM-DRILL-CLOUD-03','QTM 6 - Docker, Kubernetes, cloud','Cloud','IAM least privilege nghĩa là gì?','Chỉ cấp quyền tối thiểu cần thiết cho user/service',['Cấp admin cho mọi tài khoản','Tắt MFA để tiện dùng','Commit access key lên Git','Dùng chung root account']],
  ['QTM-DRILL-HAPROXY-01','QTM 7 - Automation & vận hành','HAProxy','Frontend trong HAProxy thường đại diện cho gì?','Điểm nhận kết nối từ client',['Server database private','Một VLAN ID','Một DHCP scope','Một Pod label']],
  ['QTM-DRILL-HAPROXY-02','QTM 7 - Automation & vận hành','HAProxy','Backend trong HAProxy thường chứa gì?','Danh sách server đích để phân phối traffic',['Danh sách VLAN native','Danh sách DNS root','Danh sách SSH key client','Danh sách OSPF area']],
  ['QTM-DRILL-AUTO-01','QTM 7 - Automation & vận hành','Automation','Playbook Ansible thường viết bằng định dạng nào?','YAML',['PCAP','JPEG','DOCX binary','MP3']],
  ['QTM-DRILL-AUTO-02','QTM 7 - Automation & vận hành','Automation','Rollback plan trong change management dùng để làm gì?','Có phương án quay lại trạng thái ổn định nếu thay đổi lỗi',['Tăng tốc CPU','Tắt giám sát','Xóa backup','Mở any-any firewall']],
  ['QTM-DRILL-AUTO-03','QTM 7 - Automation & vận hành','Automation','Vì sao nên lưu cấu hình bằng Git/private repo?','Theo dõi lịch sử thay đổi và phục hồi khi cần',['Để Git tự vá lỗi router','Để public password','Để tắt log thiết bị','Để thay DNS server']]
];

NETWORK_CONCEPT_DRILL_QUESTIONS.forEach((item, index) => {
  const [id, lesson, topic, question, correct, wrong] = item;
  NETWORK_QUESTION_BANK.push({
    id,
    type: 'mcq',
    lesson,
    topic,
    difficulty: 2,
    question,
    options: [correct].concat(wrong),
    answer: 0,
    explanation: `Câu ôn định nghĩa/thực hành ${index + 1}: ${correct}.`
  });
});

[
  {id:'QTM-ESSAY-FINAL-04', lesson:'QTM 3 - OSPF & định tuyến', topic:'Tự luận topology OSPF/VLAN', image:'assets/qtm-campus-topology.svg', config:'Yêu cầu: VLAN 10 Sinh viên, VLAN 20 Giảng viên, VLAN 30 Server, DMZ Web, Edge NAT ra Internet.\nSự cố: VLAN 10 ping gateway được nhưng không truy cập DMZ Web; OSPF neighbor Core-Edge FULL.', question:'Tự luận cuối kỳ:\na) Phân tích topology campus trong hình và thiết kế bảng địa chỉ/VLAN/gateway.\nb) Nêu luồng định tuyến từ VLAN 10 tới DMZ Web và vai trò OSPF Core-Edge.\nc) Lập checklist troubleshoot theo thứ tự Layer 2 -> Layer 3 -> ACL/NAT, có ít nhất 6 lệnh kiểm tra.', answer:'a) Bảng cần có VLAN/subnet/gateway, trunk/access/SVI, DMZ và Edge rõ ràng.\nb) VLAN 10 đi tới SVI gateway ở Core, Core route tới DMZ/Edge; OSPF Core-Edge trao đổi route và default route nếu cần.\nc) show vlan brief, show interfaces trunk, show ip interface brief, show ip route, show ip ospf neighbor, show access-lists, show ip nat translations, ping/traceroute, log web/firewall.'},
  {id:'QTM-ESSAY-FINAL-05', lesson:'QTM 6 - Docker, Kubernetes, cloud', topic:'Tự luận cloud/Kubernetes', image:'assets/qtm-cloud-lb.svg', config:'kubectl get deploy\napi   READY 3/3\n\nkubectl get svc\napi-svc ClusterIP 10.96.8.10 80/TCP\n\nkubectl get ingress\napi.example.com /api -> api-svc:80\n\nSecurity group backend: chỉ cho inbound từ LB subnet.', question:'Tự luận cuối kỳ:\na) Dựa vào topology cloud/Kubernetes, mô tả luồng request từ Internet vào API.\nb) Nêu vai trò của Load Balancer, Ingress, Service, Pod và security group trong luồng trên.\nc) Đề xuất ít nhất 8 điểm hardening khi triển khai đồ án web app bằng Docker/Kubernetes/cloud.', answer:'a) DNS -> LB/WAF -> Ingress Controller -> Service -> Pod -> database private.\nb) LB nhận public traffic/TLS, Ingress route host/path, Service tạo endpoint ổn định, Pod chạy container app, SG giới hạn network.\nc) TLS, không commit secret, RBAC least privilege, image scan, requests/limits, readiness/liveness, NetworkPolicy, private DB, backup, logging/monitoring, bastion/VPN.'},
  {id:'QTM-ESSAY-FINAL-06', lesson:'QTM 5 - Linux server, VPN, giám sát', topic:'Tự luận OpenVPN/Zabbix/File server', image:'assets/qtm-end-to-end-routers.svg', config:'OpenVPN: 10.8.0.0/24\nLAN Server: 192.168.30.0/24\nFile server: SMB/NFS/FTP trên 192.168.30.20\nZabbix server: 192.168.30.10\nFirewall: default deny INPUT/FORWARD', question:'Tự luận cuối kỳ:\na) Thiết kế route/firewall để sinh viên remote VPN truy cập file server nội bộ an toàn.\nb) Nêu chính sách phân quyền file server cho SMB/NFS/FTP, tránh public sai.\nc) Đề xuất item/trigger/cảnh báo Zabbix cho VPN và file server.', answer:'a) Push route LAN hoặc full tunnel, bật IP forwarding, rule FORWARD tun0-LAN đúng port, route ngược hoặc NAT phù hợp.\nb) Phân quyền theo group, không anonymous write, TLS/VPN, log truy cập, chặn Internet trực tiếp vào file service.\nc) Giám sát OpenVPN process/tunnel/client count, ping, port SMB/NFS/FTP, CPU/RAM/disk, disk full, failed login, backup status, cảnh báo email/Telegram.'},
  {id:'QTM-ESSAY-FINAL-07', lesson:'QTM 7 - Automation & vận hành', topic:'Tự luận automation/change', image:'assets/qtm-campus-topology.svg', config:'Tình huống: trước giờ thi lab, cần đổi ACL chặn VLAN Sinh viên truy cập VLAN Quản trị nhưng vẫn cho truy cập Web DMZ và Internet.\nHạ tầng có 2 switch access, core L3 và edge router.', question:'Tự luận cuối kỳ:\na) Lập kế hoạch thay đổi ACL an toàn: chuẩn bị, backup, maintenance window.\nb) Viết logic rule ACL theo yêu cầu, chú ý thứ tự rule và implicit deny.\nc) Nêu cách kiểm thử, rollback và dùng automation/version control để giảm sai sót.', answer:'a) Xác định luồng traffic, backup running-config, lưu diff Git, chuẩn bị rollback và thời điểm triển khai.\nb) Rule đặc hiệu trước rule rộng: deny Student -> Management, permit Student -> Web DMZ/Internet, permit management cần thiết, log deny quan trọng.\nc) Kiểm ping/traceroute/curl/show access-lists/log deny; rollback bằng cấu hình backup; automation bằng Ansible template, check mode, review và quản lý secret.'}
].forEach(item => {
  NETWORK_QUESTION_BANK.push({
    id: item.id,
    type: 'short',
    lesson: item.lesson,
    topic: item.topic,
    difficulty: 3,
    image: {src:item.image, alt:item.topic, caption:'Sơ đồ/topology dùng cho câu tự luận cuối kỳ.'},
    config: item.config,
    question: item.question,
    answer: item.answer,
    explanation: 'Câu tự luận dạng đề thi 90 phút: chấm theo khả năng phân tích topology, quy trình kiểm tra và lập luận cấu hình.'
  });
});

const COMMAND_DRILLS = [
  ['show vlan brief','xem VLAN và port access trên switch Cisco','show ip nat translations','kubectl get svc','docker images','systemctl restart ssh'],
  ['show interfaces trunk','kiểm tra trunk, native VLAN và allowed VLAN','show users','ipconfig /flushdns','docker compose down','journalctl -u zabbix-agent'],
  ['show mac address-table','xem bảng MAC học được trên switch','show ip ospf neighbor','kubectl describe node','iptables -t nat -L','nslookup -type=mx'],
  ['show ip interface brief','xem nhanh trạng thái interface và IP trên router/switch L3','show spanning-tree blockedports','docker ps -a','systemctl list-timers','kubectl logs'],
  ['show ip route','xem bảng định tuyến IPv4','show vlan private-vlan','docker volume ls','ss -tulpn','dig TXT'],
  ['show ip ospf neighbor','kiểm tra láng giềng OSPF và trạng thái adjacency','show ip dhcp binding','docker network prune','kubectl rollout undo','iptables -S'],
  ['show access-lists','xem hit count và rule ACL','show version','docker exec','kubectl cordon','journalctl -xe'],
  ['show ip nat translations','xem phiên NAT/PAT đang được tạo','show archive','kubectl get ingress','dig AAAA','systemctl enable nginx'],
  ['ping','kiểm tra reachability cơ bản ở layer 3','show inventory','docker pull','kubectl scale','net user'],
  ['traceroute','xem đường đi layer 3 tới đích','show clock','docker login','kubectl taint','hostnamectl'],
  ['nslookup','kiểm tra phân giải DNS từ client','show controllers','docker save','kubectl label','route print'],
  ['ss -tulpn','xem port listen và process trên Linux','show cdp neighbors','docker tag','kubectl top nodes','gpupdate /force'],
  ['systemctl status nginx','kiểm tra trạng thái service nginx','show ip protocols','docker rm -f','kubectl api-resources','ip route add'],
  ['journalctl -u openvpn','xem log service OpenVPN trên Linux systemd','show interfaces status','docker history','kubectl config get-contexts','arp -a'],
  ['iptables -L -n -v','xem rule filter và hit counter trên Linux firewall','show ip arp','docker inspect','kubectl get events','netstat -ano'],
  ['iptables -t nat -L -n -v','xem rule NAT như DNAT/SNAT/MASQUERADE','show standby','docker restart','kubectl delete pod','nltest /dsgetdc'],
  ['docker ps','xem container đang chạy','show etherchannel summary','ip helper-address','kubectl explain pod','repadmin /replsummary'],
  ['docker compose up -d','khởi chạy các service trong compose ở background','show run interface trunk','ipconfig /all','kubectl drain','zabbix_get'],
  ['docker logs web','xem log container web','show ip route ospf','dig NS','kubectl get pv','systemctl mask'],
  ['docker network ls','xem các network Docker','show spanning-tree root','nslookup A','kubectl get secret','tcpdump -i any'],
  ['kubectl get pods','xem trạng thái Pod trong namespace hiện tại','show vlan id 10','docker build','systemctl reload','iptables -F'],
  ['kubectl describe pod api','xem event, probe, image, volume và lỗi scheduling của Pod','show mac address-table dynamic','docker compose logs','ip route','dig CNAME'],
  ['kubectl logs api','xem log ứng dụng trong Pod','show ip nat statistics','docker volume inspect','systemctl cat nginx','route add'],
  ['kubectl get svc','xem Service, type, ClusterIP và port','show access-session','docker cp','journalctl -f','nslookup -type=txt'],
  ['kubectl get endpoints','kiểm tra Service có Pod backend hay không','show run | section router ospf','docker port','systemctl disable','netsh advfirewall show allprofiles'],
  ['kubectl get ingress','xem rule host/path expose HTTP/HTTPS','show ip dhcp pool','docker stats','journalctl --since today','ip addr'],
  ['kubectl rollout status deployment/api','kiểm tra trạng thái rollout của Deployment','show ip interface vlan 10','docker compose ps','iptables -P INPUT DROP','dig SOA'],
  ['zabbix_get','kiểm tra item Zabbix agent từ server/proxy','show logging','docker events','kubectl auth can-i','systemctl is-enabled'],
  ['tcpdump -i tun0','bắt gói trên interface VPN tun0','show platform','docker context ls','kubectl get cm','repadmin /showrepl'],
  ['gpupdate /force','ép client Windows cập nhật Group Policy','show ip cef','docker secret ls','kubectl get ns','iptables-save']
];

COMMAND_DRILLS.forEach((row, index) => {
  const [cmd, purpose, ...wrong] = row;
  NETWORK_QUESTION_BANK.push({
    id: `QTM-CMD-${String(index + 1).padStart(3,'0')}`,
    type: 'mcq',
    lesson: index < 8 ? 'QTM 2 - Switching, VLAN, STP' : (index < 16 ? 'QTM 5 - Linux server, VPN, giám sát' : (index < 27 ? 'QTM 6 - Docker, Kubernetes, cloud' : 'QTM 7 - Automation & vận hành')),
    topic: 'Lệnh thực hành',
    difficulty: 2,
    question: `Lệnh "${cmd}" thường dùng để làm gì?`,
    options: [purpose].concat(wrong.slice(0,4)),
    answer: 0,
    explanation: `Trong bài thực hành, "${cmd}" dùng để ${purpose}.`
  });
});

const TROUBLESHOOTING_DRILLS = [
  ['PC cùng VLAN ping nhau được nhưng không ra Internet','default gateway, route mặc định hoặc NAT/firewall ở edge','root bridge STP bị đổi tên','Docker image thiếu tag','Ingress thiếu TLS secret'],
  ['Client nhận APIPA 169.254.x.x','DHCP không cấp được lease hoặc client không tới được DHCP server','OSPF cost quá thấp','NAT overload hoạt động tốt','Zabbix trigger quá dài'],
  ['VLAN mới tạo nhưng không qua uplink','trunk chưa allow VLAN đó hoặc VLAN chưa tồn tại hai đầu','DNS thiếu bản ghi MX','Docker volume đầy','OpenVPN certificate hết hạn'],
  ['OSPF neighbor không lên dù ping trực tiếp được','kiểm tra area, timer, authentication, passive-interface và subnet mask','kiểm tra SMB share permission trước tiên','tăng replicas trong Kubernetes','đổi DNS sang 8.8.8.8 là đủ'],
  ['Service Kubernetes có endpoints rỗng','selector của Service không khớp label Pod hoặc Pod chưa Ready','Security group mở quá rộng','STP root bridge sai','DHCP excluded-address quá ngắn'],
  ['Pod CrashLoopBackOff','xem logs/describe để kiểm tra command, env, secret, probe hoặc dependency','tạo VLAN native mới','đổi OSPF area về 1','mở SMB ra Internet'],
  ['Web container chạy nhưng host không truy cập được port','kiểm tra port mapping host:container và firewall host','kiểm tra Bridge ID STP','tắt DHCP relay','xóa DNS zone'],
  ['Client VPN connected nhưng không tới LAN','kiểm tra route push, IP forwarding, FORWARD firewall và route ngược/NAT','kiểm tra native VLAN mismatch đầu tiên','xóa Kubernetes Service','đổi port HTTP sang 53'],
  ['Zabbix không cảnh báo khi service chết','kiểm tra item, trigger expression, agent/server connectivity và action notification','thêm OSPF network statement','đổi Docker image sang latest','tăng STP priority'],
  ['FTP login được nhưng list/download lỗi','kiểm tra passive mode và dải passive port trên firewall/NAT','kiểm tra OSPF DR election','đổi Service sang ClusterIP','xóa route mặc định'],
  ['AD client join domain thất bại','kiểm tra DNS trỏ về domain controller, thời gian hệ thống và quyền join','kiểm tra HAProxy balance algorithm','đổi Docker bridge subnet','tắt BPDU Guard'],
  ['Guacamole truy cập RDP chập chờn','kiểm tra backend RDP/SSH, guacd, reverse proxy timeout và log phiên','mở DNS TCP 53 ra Internet','đổi VLAN native','tăng OSPF reference bandwidth'],
  ['HAProxy vẫn gửi traffic tới server lỗi','kiểm tra health check, rise/fall, check option và backend status','kiểm tra DHCP DORA','xóa Pod label','đổi subnet /24 sang /30'],
  ['Database cloud bị truy cập trực tiếp từ Internet','security group/subnet đang public quá rộng, cần private subnet và chỉ app tier được vào','Ingress path sai','STP loop','Zabbix item disabled'],
  ['SSH public bị brute force','giới hạn source qua VPN/bastion, dùng key/MFA, fail2ban và tắt password nếu phù hợp','bật PortFast trunk','đổi Docker tag latest','xóa default route'],
  ['Route OSPF có nhưng traffic chiều về mất','kiểm tra route ngược, ACL/firewall và NAT exemption nếu qua VPN','kiểm tra CNAME record','kiểm tra Docker volume','kiểm tra Group Policy'],
  ['NFS mount bị permission denied','kiểm tra export rule, client IP, filesystem permission và firewall','kiểm tra OSPF passive-interface','đổi Ingress class','xóa bridge Docker'],
  ['SMB truy cập được bằng IP nhưng không bằng tên','kiểm tra DNS/NetBIOS, AD DNS và bản ghi liên quan','kiểm tra NAT overload','kiểm tra STP cost','kiểm tra readinessProbe'],
  ['Ingress trả 404 nhưng Pod vẫn chạy','kiểm tra host/path rule, Ingress Controller và Service backend','kiểm tra VLAN allowed list','kiểm tra SNMP community','kiểm tra DHCP scope'],
  ['Deployment rollout kẹt','kiểm tra image pull, probe, resource limit, event và replica availability','kiểm tra OSPF router-id','kiểm tra FTP passive port','kiểm tra AD OU'],
  ['Switch báo native VLAN mismatch','đồng bộ native VLAN hai đầu trunk hoặc đổi sang native VLAN không dùng','tăng replicas Pod','tạo NAT static','đổi DNS forwarder'],
  ['Port-security err-disabled','kiểm tra MAC vi phạm, policy shutdown/restrict/protect và recovery','kiểm tra ClusterIP','xóa DHCP lease server','đổi OpenVPN cipher'],
  ['ACL cho phép host đặc biệt nhưng vẫn bị chặn','kiểm tra thứ tự rule và deny rộng hơn phía trên','kiểm tra Dockerfile ENTRYPOINT','kiểm tra DNS MX','kiểm tra Zabbix action'],
  ['NAT port forward từ ngoài vào không được','kiểm tra static NAT/DNAT, outside ACL, route tới server và service đang listen','kiểm tra STP PortFast','kiểm tra ConfigMap','kiểm tra AD GPO'],
  ['Cloud VM ping ra Internet được nhưng không SSH vào được','kiểm tra security group inbound, NACL, public IP, route table và SSH service','kiểm tra Kubernetes Service selector','kiểm tra VLAN 20','kiểm tra DNS AAAA'],
  ['Container mất dữ liệu sau khi recreate','thiếu volume/bind mount cho dữ liệu stateful','OSPF area mismatch','native VLAN mismatch','Zabbix trigger sai'],
  ['Compose app không kết nối được db bằng localhost','trong container localhost là chính container; nên dùng tên service/network','ACL implicit deny','STP blocking port','DHCP relay thiếu'],
  ['Kubernetes Secret bị commit lên Git','phải rotate secret và chuyển sang secret manager/quy trình không commit bí mật','đổi VLAN native','xóa OSPF route','tắt HAProxy check'],
  ['Monitoring báo quá nhiều cảnh báo giả','điều chỉnh ngưỡng, duration, dependency và trigger theo dịch vụ','xóa toàn bộ log','mở any-any firewall','tắt DNS'],
  ['Backup cấu hình có file nhưng restore không được','cần kiểm tra định dạng, version thiết bị, secret, quy trình restore thử và quyền truy cập','thêm Docker replicas','đổi STP priority','bật DNS recursion public']
];

TROUBLESHOOTING_DRILLS.forEach((row, index) => {
  const [symptom, correct, ...wrong] = row;
  NETWORK_QUESTION_BANK.push({
    id: `QTM-LAB-${String(index + 1).padStart(3,'0')}`,
    type: 'mcq',
    lesson: index < 4 ? 'QTM 1 - IP, subnet, dịch vụ nền' : (index < 10 ? 'QTM 6 - Docker, Kubernetes, cloud' : (index < 18 ? 'QTM 5 - Linux server, VPN, giám sát' : 'QTM 7 - Automation & vận hành')),
    topic: 'Tình huống thực hành',
    difficulty: index % 3 === 0 ? 3 : 2,
    question: `Tình huống thực hành: ${symptom}. Hướng kiểm tra hợp lý nhất là gì?`,
    options: [correct].concat(wrong.slice(0,4)),
    answer: 0,
    explanation: `Hướng xử lý trọng tâm: ${correct}.`
  });
});

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-ESSAY-END2END-01',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Tự luận end-to-end routing',
    difficulty: 3,
    image: {src:'assets/qtm-end-to-end-routers.svg', alt:'End-to-end router topology', caption:'Topology end-to-end: chi nhánh A, Core/DC, chi nhánh B, server LAN, Internet và VPN.'},
    config: 'R-A <-> R-Core: 10.0.12.0/30\nR-Core <-> R-B: 10.0.23.0/30\nLAN A: 192.168.10.0/24\nLAN B: 192.168.20.0/24\nServer LAN: 10.10.30.0/24\nYêu cầu: hai LAN truy cập server, đi Internet qua Core, VPN A-B bảo mật.\n\nOutput R-A#show ip route ospf\nO 192.168.20.0/24 [110/2] via 10.0.12.2, 00:00:12, Gig0/0\nO 10.10.30.0/24 [110/2] via 10.0.12.2, 00:00:12, Gig0/0\n\nOutput R-Core#show ip route 192.168.10.0\nRouting entry for 192.168.10.0/24\n  Known via ospf 1, metric 2\n  * 10.0.12.1, from 1.1.1.1, Gig0/0',
    question: 'Tự luận cuối kỳ:\na) Dựa vào topology, lập bảng IP cho các router/interface chính và đề xuất default gateway cho LAN A, LAN B, Server LAN.\nb) Thiết kế định tuyến end-to-end bằng OSPF area 0 hoặc static route. Nêu route/default route cần có để LAN A truy cập LAN B và Server LAN.\nc) Đề xuất NAT ra Internet tại Core và cơ chế VPN giữa hai chi nhánh. Nêu tối thiểu 6 lệnh kiểm tra khi LAN A không truy cập được server 10.10.30.20.',
    answer: 'a) Bảng IP cần khớp subnet trong đề: R-A LAN 192.168.10.1/24, R-A WAN 10.0.12.1/30; R-Core phía A 10.0.12.2/30, phía B 10.0.23.1/30, server gateway 10.10.30.1/24; R-B WAN 10.0.23.2/30, LAN 192.168.20.1/24.\nb) Nếu OSPF: quảng bá 192.168.10.0/24, 10.0.12.0/30, 10.0.23.0/30, 192.168.20.0/24, 10.10.30.0/24 trong area 0; Core có default route ra Internet và originate nếu cần. Nếu static: mỗi router phải có route tới các LAN còn lại và route ngược.\nc) NAT overload chỉ áp dụng traffic ra Internet, không NAT traffic VPN/nội bộ; VPN có thể IPsec/OpenVPN site-to-site giữa R-A và R-B. Lệnh kiểm tra: show ip interface brief, show ip route, show ip ospf neighbor, show access-lists, show ip nat translations, ping, traceroute, tcpdump/log firewall.',
    explanation: 'Câu này chấm end-to-end: addressing, routing, NAT/VPN và troubleshooting theo lớp.'
  },
  {
    id: 'QTM-ESSAY-END2END-02',
    type: 'short',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Tự luận ACL/NAT end-to-end',
    difficulty: 3,
    image: {src:'assets/qtm-end-to-end-routers.svg', alt:'ACL NAT topology', caption:'Topology dùng để phân tích ACL/NAT cho luồng end-to-end.'},
    config: 'Chính sách:\n- LAN A và LAN B được truy cập Web nội bộ 10.10.30.20:80/443.\n- Chỉ VLAN quản trị được SSH router/server.\n- Người dùng đi Internet qua NAT tại Core.\n- Không cho Internet truy cập trực tiếp database nội bộ.',
    question: 'Tự luận cuối kỳ:\na) Viết chính sách ACL ở mức logic cho các luồng được phép/chặn theo đề bài. Chỉ rõ nguồn, đích, dịch vụ.\nb) Chỉ ra NAT nào cần dùng cho Internet và traffic nào phải được loại khỏi NAT.\nc) Nếu user LAN B đi Internet được nhưng không truy cập Web 10.10.30.20 được, hãy nêu quy trình kiểm tra theo thứ tự routing -> ACL -> service.',
    answer: 'a) Permit LAN A/B tới 10.10.30.20 TCP 80/443; permit VLAN quản trị tới router/server TCP 22/HTTPS quản trị; deny user VLAN tới database/management; deny Internet trực tiếp vào DB; log deny quan trọng.\nb) NAT overload/PAT tại Core cho traffic private ra Internet. Traffic LAN A/B tới Server LAN hoặc VPN site-to-site phải no-NAT/NAT exemption.\nc) Kiểm tra route hai chiều tới 10.10.30.0/24, default gateway server, ACL hit count và thứ tự rule, firewall host, service listen bằng ss/netstat/curl, log web/firewall, ping/traceroute từng hop.',
    explanation: 'Đề ACL/NAT thường chia ý theo policy, NAT exemption và troubleshoot.'
  }
);

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-ESSAY-PT-VLAN-01',
    type: 'short',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Tự luận Packet Tracer VLAN addressing',
    difficulty: 3,
    image: {src:'assets/qtm-packet-tracer-vlan-addressing.svg', alt:'Packet Tracer VLAN topology with PC IPs and default gateways', caption:'Topology Packet Tracer: PC, switch, Core L3, IP host, default gateway và bảng địa chỉ.'},
    config: 'Tình huống: PC-A VLAN10 ping được PC-C VLAN10 nhưng không truy cập được WEB 192.168.30.50. PC-B VLAN20 vẫn ra Internet bình thường.\nYêu cầu giữ nguyên bảng địa chỉ trong hình, chỉ sửa cấu hình mạng nếu cần.',
    question: 'Tự luận Packet Tracer:\na) Dựa vào hình, lập lại bảng VLAN/subnet/default gateway cho VLAN 10, VLAN 20, VLAN 30/DMZ và chỉ rõ port trunk/access cần có.\nb) Mô tả luồng gói tin từ PC-A 192.168.10.11 tới WEB 192.168.30.50 qua default gateway nào, thiết bị nào định tuyến liên VLAN.\nc) Nêu quy trình troubleshoot theo thứ tự Layer 2 -> Layer 3 -> ACL/firewall, kèm tối thiểu 8 lệnh kiểm tra và kết quả mong đợi.',
    answer: 'a) VLAN10 Students: 192.168.10.0/24, gateway SVI 192.168.10.1, host PC-A .11 và PC-C .21. VLAN20 Teachers: 192.168.20.0/24, gateway 192.168.20.1, host PC-B .12 và PC-E .22. VLAN30 Server/DMZ: 192.168.30.0/24, gateway 192.168.30.1, WEB 192.168.30.50. Các port nối PC là access đúng VLAN; uplink S1/S2/S3 lên CORE-L3 là trunk allow VLAN 10,20,30,99.\nb) PC-A thấy đích khác subnet nên gửi frame tới MAC của default gateway 192.168.10.1 trên CORE-L3. CORE-L3 định tuyến từ SVI VLAN10 sang SVI VLAN30 rồi ARP tới WEB 192.168.30.50. Nếu đi Internet thì CORE/EDGE dùng default route và NAT; riêng PC-A tới WEB nội bộ không nên NAT.\nc) Kiểm tra: show vlan brief để xác nhận port PC đúng VLAN; show interfaces trunk để xác nhận VLAN 10/30 được allow; show spanning-tree vlan 10,30 để xem port không bị block sai; show mac address-table để thấy MAC học được; show ip interface brief để SVI VLAN10/VLAN30 up/up; show ip route để có connected route hai VLAN; ping 192.168.10.1 rồi ping 192.168.30.50 source VLAN10; show access-lists/log firewall để xem có deny VLAN10 -> DMZ; trên WEB kiểm IP/gateway/firewall và service port 80/443.',
    explanation: 'Dạng này chấm theo khả năng đọc bảng địa chỉ, xác định default gateway, phân biệt switching và inter-VLAN routing, rồi troubleshoot có thứ tự.'
  },
  {
    id: 'QTM-ESSAY-PT-ROUTING-01',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Tự luận Packet Tracer routing triangle',
    difficulty: 3,
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Three-router topology with LAN IPs, default gateways and serial links', caption:'Topology Packet Tracer: R1-R2-R3, LAN A/B/C, serial /30 và bảng interface.'},
    config: 'Yêu cầu: tất cả PC-A..PC-F ping được nhau. Dùng OSPF area 0 hoặc static route, nhưng phải trình bày route hai chiều rõ ràng.\nSự cố: PC-A ping R1 gateway được nhưng không ping được PC-F 192.168.30.12.\n\nOutput R1#show ip route\nC 192.168.10.0/24 is directly connected, Gig0/1\nC 10.0.12.0/30 is directly connected, Serial0/0/0\nO 192.168.20.0/24 [110/2] via 10.0.12.2, 00:00:18, Serial0/0/0\n\nOutput R3#show ip route 192.168.10.0\n% Network not in table',
    question: 'Tự luận routing:\na) Dựa vào hình, ghi bảng IP cho các LAN gateway và ba link serial /30.\nb) Nếu dùng OSPF, viết logic network statement/area cần có trên R1, R2, R3. Nếu dùng static route, nêu các route tối thiểu để LAN 192.168.10.0/24 tới 192.168.30.0/24 và ngược lại.\nc) Troubleshoot sự cố PC-A không ping được PC-F theo từng hop, kèm lệnh kiểm tra trên PC, R1, R2, R3.',
    answer: 'a) LAN A sau R1: 192.168.10.0/24, gateway R1 G0/1 = 192.168.10.1. LAN B sau R2: 192.168.20.0/24, gateway R2 G0/1 = 192.168.20.1. LAN C sau R3: 192.168.30.0/24, gateway R3 G0/1 = 192.168.30.1. Serial R1-R2: 10.0.12.0/30 với R1 .1, R2 .2. Serial R2-R3: 10.0.23.0/30 với R2 .1, R3 .2. Serial R1-R3: 10.0.13.0/30 với R1 .1, R3 .2.\nb) OSPF: R1 quảng bá 192.168.10.0/24, 10.0.12.0/30, 10.0.13.0/30 area 0; R2 quảng bá 192.168.20.0/24, 10.0.12.0/30, 10.0.23.0/30 area 0; R3 quảng bá 192.168.30.0/24, 10.0.23.0/30, 10.0.13.0/30 area 0. Static route tối thiểu: R1 route 192.168.30.0/24 qua 10.0.13.2 hoặc qua R2; R3 route 192.168.10.0/24 qua 10.0.13.1; R2 cần route transit nếu chọn đường qua R2.\nc) PC-A: kiểm IP/mask/gateway bằng ipconfig, ping 192.168.10.1. R1: show ip interface brief, show ip route 192.168.30.0, show ip ospf neighbor, ping 10.0.13.2/10.0.12.2. R3: show ip route 192.168.10.0, ping 192.168.30.12 source 192.168.30.1, kiểm ACL. Dùng traceroute từ PC-A để biết mất ở R1, R2 hay R3; kiểm encapsulation/clock rate serial nếu link down.',
    explanation: 'Câu này bắt buộc có route chiều đi và chiều về; chỉ ping gateway được chưa chứng minh liên mạng hoạt động.'
  },
  {
    id: 'QTM-ESSAY-PT-ACL-01',
    type: 'short',
    lesson: 'QTM 4 - ACL, NAT, firewall',
    topic: 'Tự luận ACL theo bảng IP topology',
    difficulty: 3,
    image: {src:'assets/qtm-packet-tracer-vlan-addressing.svg', alt:'VLAN topology for ACL and NAT policy', caption:'Dựa trên IP/gateway trong topology để viết policy ACL đúng nguồn, đích, dịch vụ.'},
    config: 'Chính sách:\n- VLAN10 Students chỉ được truy cập WEB 192.168.30.50 TCP 80/443 và Internet.\n- VLAN20 Teachers được truy cập WEB và SSH quản trị WEB.\n- Không VLAN user nào được truy cập trực tiếp gateway quản trị CORE/EDGE.\n- NAT chỉ dùng cho traffic ra Internet.',
    question: 'Tự luận ACL/NAT:\na) Viết policy ACL mức logic cho từng luồng: Students -> WEB, Teachers -> WEB/SSH, user VLAN -> management gateway, LAN -> Internet.\nb) ACL nên đặt gần nguồn hay gần đích? Chỉ rõ vị trí áp trên SVI/interface và chiều inbound/outbound.\nc) Nêu cách kiểm chứng bằng lệnh và log khi Students vẫn SSH được vào WEB hoặc bị chặn cả HTTP.',
    answer: 'a) Permit VLAN10 192.168.10.0/24 tới host 192.168.30.50 TCP 80/443; deny VLAN10 tới 192.168.30.50 TCP 22; permit VLAN10 ra Internet theo policy NAT. Permit VLAN20 tới 192.168.30.50 TCP 80/443/22 nếu giáo viên được quản trị. Deny các VLAN user tới IP quản trị CORE/EDGE, ví dụ 192.168.10.1/20.1/30.1 hoặc management VLAN, trừ subnet quản trị riêng. Cuối ACL cần permit các luồng hợp lệ hoặc hiểu implicit deny.\nb) Extended ACL nên đặt gần nguồn để chặn sớm và đúng luồng. Có thể áp inbound trên SVI VLAN10 cho rule Students, inbound trên SVI VLAN20 cho rule Teachers. NAT overload áp ở Edge/Core cho traffic đi outside; traffic nội bộ tới WEB 192.168.30.50 không NAT.\nc) Dùng show access-lists để xem hit count rule deny/permit; show run interface vlan 10 để xác nhận ACL đúng chiều; test curl/telnet từ PC-A tới 80/443/22; xem log deny trên firewall; kiểm thứ tự rule vì deny rộng đặt trên permit sẽ chặn HTTP; kiểm service WEB có listen bằng ss/netstat và firewall host.',
    explanation: 'Đáp án mạnh phải có nguồn, đích, port, vị trí đặt ACL, chiều áp ACL và cách kiểm chứng hit count.'
  },
  {
    id: 'QTM-ESSAY-PT-SUBNET-01',
    type: 'short',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Tự luận subnet và default gateway',
    difficulty: 3,
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Routing topology for subnet and gateway design', caption:'Dựa vào topology để thiết kế subnet, gateway, route và kiểm lỗi IP.'},
    config: 'Yêu cầu mở rộng: mỗi LAN cần thêm 40 thiết bị trong học kỳ sau. Giữ mô hình 3 router và 3 LAN như hình, có thể đổi subnet LAN nếu cần nhưng serial links vẫn dùng /30.',
    question: 'Tự luận subnet:\na) Đề xuất subnet cho LAN A/B/C sao cho mỗi LAN chứa được ít nhất 40 host, nêu network, gateway, usable range, broadcast.\nb) Vì sao serial link router-router nên dùng /30 hoặc /31 thay vì /24 trong bài lab này?\nc) Nếu PC-F cấu hình IP 192.168.30.12/24 nhưng gateway nhầm 192.168.20.1, phân tích hiện tượng và cách kiểm tra/sửa.',
    answer: 'a) Có thể giữ /24 như hình vì mỗi LAN có 254 usable, đủ 40 host: LAN A 192.168.10.0/24 gateway 192.168.10.1 usable .1-.254 broadcast .255; LAN B 192.168.20.0/24 gateway 192.168.20.1; LAN C 192.168.30.0/24 gateway 192.168.30.1. Nếu muốn tiết kiệm hơn, dùng /26 cho mỗi LAN vì có 62 usable: ví dụ 192.168.10.0/26 gateway .1 usable .1-.62 broadcast .63.\nb) Link router-router chỉ cần 2 địa chỉ usable nên /30 tiết kiệm địa chỉ và dễ đọc trong Packet Tracer; /31 dùng được trên point-to-point nếu thiết bị hỗ trợ. Dùng /24 cho serial gây lãng phí và dễ nhầm route.\nc) PC-F vẫn ping được thiết bị cùng LAN 192.168.30.0/24, nhưng không đi khác mạng vì default gateway 192.168.20.1 không nằm cùng subnet nên ARP/gửi gateway thất bại. Kiểm ipconfig, ping 192.168.30.1, arp -a; sửa gateway thành 192.168.30.1 rồi ping R3, PC-A/PC-C và traceroute.',
    explanation: 'Câu subnet phải tính đủ host, range, broadcast và giải thích vai trò default gateway theo subnet cục bộ.'
  }
);

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-ESSAY-PASTYEAR-FAULT-01',
    type: 'short',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Tu luan dang de cac nam - tim loi topology',
    difficulty: 3,
    image: {src:'assets/qtm-packet-tracer-error-lab.svg', alt:'Packet Tracer fault lab with red error markers', caption:'Topology loi co y: E1 trunk thieu VLAN, E2 gateway sai, E3 ACL chan, E4 thieu DHCP relay.'},
    config: 'Dang mo phong theo de QTM cac nam: cho so do Packet Tracer, bang IP va mot so trieu chung. Sinh vien phai chi ra loi tren topology, giai thich nguyen nhan, neu lenh kiem tra va cach sua.\nTrieu chung: PC-D khong toi WEB; PC-F khong ra khac mang; PC-A khong vao WEB; VLAN20 khong nhan DHCP.',
    question: 'Tu luan:\na) Dua vao cac marker E1-E4 trong hinh, giai thich tung loi dang nam o thiet bi/interface nao va anh huong toi luong traffic nao.\nb) Voi moi loi, neu it nhat 2 lenh kiem tra Cisco/Linux/PC tuong ung va ket qua mong doi neu loi dung nhu hinh.\nc) Viet huong sua cau hinh theo thu tu an toan, tranh sua nham lam mat cac VLAN/luong khac.',
    answer: 'a) E1 nam tren trunk S2-CORE: trunk chi allow VLAN10,20 nen VLAN30 cua PC-D khong len CORE, PC-D khong toi WEB/DMZ. E2 nam o PC-F: IP thuoc VLAN20 nhung gateway cau hinh 192.168.30.1 nen PC-F chi co the giao tiep noi bo cung VLAN20, khong di lien mang. E3 nam o ACL tren VLAN10: deny 192.168.10.0/24 toi WEB 192.168.30.50 nen PC-A/PC-C bi chan du routing co the dung. E4 nam tren SVI VLAN20: thieu ip helper-address nen DHCP Discover khong duoc relay toi DHCP server khac VLAN.\nb) E1: show interfaces trunk, show vlan brief, show spanning-tree vlan 30; mong doi VLAN30 khong co trong allowed/active trunk S2. E2: ipconfig tren PC-F, ping 192.168.20.1, arp -a; mong doi gateway sai subnet hoac ping gateway that that bai. E3: show access-lists, show run interface vlan 10, ping/curl tu PC-A toi 192.168.30.50; mong doi hit count tang o rule deny. E4: show run interface vlan 20, show ip dhcp binding, debug/ipconfig renew; mong doi khong co ip helper-address hoac khong co lease.\nc) Sua E1: switchport trunk allowed vlan add 30 tren uplink S2-CORE, khong ghi de mat VLAN cu. Sua E2: dat gateway PC-F thanh 192.168.20.1. Sua E3: doi thu tu ACL, permit TCP 80/443 toi WEB truoc hoac bo deny sai, van giu least privilege. Sua E4: them ip helper-address <DHCP-server-IP> tren interface Vlan20, kiem route/firewall UDP 67/68.',
    explanation: 'Cau nay luyen dung kieu de cho topology co loi: phai khoanh vung loi, chung minh bang lenh, roi moi sua.'
  },
  {
    id: 'QTM-ESSAY-PASTYEAR-SUBNET-OSPF-01',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Tu luan dang de cac nam - subnet va dinh tuyen',
    difficulty: 3,
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Three router Packet Tracer topology for subnet and OSPF essay', caption:'Dang de cu thuong yeu cau chia subnet/router interface roi cau hinh route hoac OSPF.'},
    config: 'Mo phong dang de 2023-2024/2024-2025: doanh nghiep co 3 LAN noi qua 3 router. Can thiet ke dia chi, cau hinh dinh tuyen va kiem tra ping end-to-end.\nYeu cau toi thieu: LAN A 50 host, LAN B 30 host, LAN C 60 host; cac link serial dung /30.',
    question: 'Tu luan:\na) Chon subnet phu hop cho LAN A/B/C va ba link serial. Ghi network, gateway, usable range, broadcast.\nb) Viet logic cau hinh OSPF area 0 cho R1/R2/R3 dua tren bang interface trong hinh.\nc) Neu PC-A ping gateway duoc nhung khong ping PC-F duoc, hay phan tich 5 nguyen nhan co the va lenh kiem tra tuong ung.',
    answer: 'a) Co the dung /26 cho LAN A 50 host va LAN C 60 host vi co 62 usable; LAN B 30 host dung /27 hoac giu /26 cho dong nhat. Vi du LAN A 192.168.10.0/26 gateway .1 usable .1-.62 broadcast .63; LAN B 192.168.20.0/27 gateway .1 usable .1-.30 broadcast .31; LAN C 192.168.30.0/26 gateway .1 usable .1-.62 broadcast .63. Serial: 10.0.12.0/30, 10.0.23.0/30, 10.0.13.0/30.\nb) R1 quang ba LAN A va link R1-R2/R1-R3 vao area 0; R2 quang ba LAN B va link R1-R2/R2-R3; R3 quang ba LAN C va link R2-R3/R1-R3. Dung wildcard dung: /26 la 0.0.0.63, /27 la 0.0.0.31, /30 la 0.0.0.3.\nc) Nguyen nhan: gateway PC-F sai -> ipconfig/ping gateway; OSPF neighbor down -> show ip ospf neighbor; thieu network statement LAN C -> show ip route/show ip protocols; serial link down/encapsulation sai -> show ip interface brief/show controllers serial; ACL chan ICMP hoac route chieu ve thieu -> show access-lists/show ip route 192.168.10.0.',
    explanation: 'Bam dang de cac nam: vua tinh subnet, vua cau hinh dinh tuyen, vua troubleshoot end-to-end.'
  },
  {
    id: 'QTM-ESSAY-PASTYEAR-DHCP-DNS-ACL-01',
    type: 'short',
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    topic: 'Tu luan dang de cac nam - dich vu nen va ACL',
    difficulty: 3,
    image: {src:'assets/qtm-packet-tracer-error-lab.svg', alt:'Fault topology for DHCP DNS ACL essay', caption:'Dua vao loi E3/E4 de phan tich DHCP relay, DNS va ACL/firewall.'},
    config: 'Tinh huong tong hop: DHCP server nam o VLAN30/Server LAN. VLAN20 khong nhan IP DHCP. VLAN10 co IP tinh, ping gateway duoc nhung truy cap web.company.local that bai. DNS noi bo tro web.company.local ve 192.168.30.50.',
    question: 'Tu luan:\na) Phan tich duong di DHCP Discover tu PC VLAN20 toi DHCP server khac VLAN. Can cau hinh gi tren gateway VLAN20?\nb) Phan tich vi sao VLAN10 ping gateway duoc nhung truy cap web.company.local that bai: tach rieng loi DNS, loi routing va loi ACL.\nc) Neu checklist kiem tra theo thu tu, co lenh o PC, switch/core va server.',
    answer: 'a) DHCP Discover la broadcast nen khong tu di qua router/SVI. Gateway VLAN20 phai co ip helper-address tro toi DHCP server; DHCP server can scope dung 192.168.20.0/24, default-router 192.168.20.1, DNS option, route nguoc va firewall cho UDP 67/68.\nb) Neu DNS loi: nslookup web.company.local khong tra 192.168.30.50 hoac client tro sai DNS. Neu routing loi: ping 192.168.30.50/traceroute mat o Core/Edge, show ip route thieu connected/static/OSPF. Neu ACL loi: ping/HTTP bi chan nhung route dung, show access-lists co hit deny tu 192.168.10.0/24 toi 192.168.30.50.\nc) PC: ipconfig /all, nslookup, ping gateway, ping IP web, tracert. Core: show ip interface brief, show run interface vlan 20, show ip dhcp relay/helper, show access-lists, show ip route. Server: kiem IP/gateway/DNS record, service web listen 80/443, firewall host va log web.',
    explanation: 'Cau nay ep tach trieu chung: DNS chi doi ten thanh IP, routing quyet dinh duong di, ACL/firewall quyet dinh cho qua hay chan.'
  },
  {
    id: 'QTM-ESSAY-PASTYEAR-VPN-SERVER-01',
    type: 'short',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Tu luan dang de cac nam - VPN va server',
    difficulty: 3,
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Routing topology for VPN and server troubleshooting essay', caption:'Dang de do an/quan tri: client VPN, route chieu ve, firewall va giam sat server.'},
    config: 'Mo phong dang de cuoi ky/do an: sinh vien remote qua VPN vao LAN C de truy cap WEB 192.168.30.50 va file server. VPN client nhan IP 10.8.0.10/24 nhung chi ping duoc VPN server, khong toi WEB.',
    question: 'Tu luan:\na) Ve/dien giai duong di goi tin tu VPN client 10.8.0.10 toi WEB 192.168.30.50 trong topology router/server.\nb) Neu cac cau hinh bat buoc tren VPN server/router/firewall de traffic VPN vao LAN hoat dong.\nc) De xuat giam sat Zabbix hoac log can co de phat hien VPN/server loi.',
    answer: 'a) Client gui goi qua tunnel tun0 toi VPN server; VPN server forward sang LAN/router co route toi 192.168.30.0/24; WEB tra loi ve 10.8.0.0/24 qua default gateway hoac route nguoc/NAT. Neu thieu route chieu ve, request co the toi WEB nhung reply khong quay lai client.\nb) Can push route 192.168.30.0/24 cho client, bat IP forwarding, firewall FORWARD cho tun0 -> LAN dung port, route nguoc tu LAN toi 10.8.0.0/24 hoac NAT/MASQUERADE phu hop, DNS noi bo neu dung ten, khong mo file service public ra Internet.\nc) Zabbix item: trang thai openvpn process, so client connected, ping VPN gateway, ping WEB tu VPN server, port 80/443/SMB/NFS/FTP, disk/CPU/RAM, failed login, certificate expiry, log auth/openvpn. Trigger co duration de tranh canh bao gia, action gui email/Telegram.',
    explanation: 'Dang nay giong de quan tri thuc hanh: phai co route di, route ve, firewall va giam sat van hanh.'
  }
);

NETWORK_QUESTION_BANK.push(
  {
    id: 'QTM-ESSAY-OUTPUT-ROUTE-01',
    type: 'short',
    lesson: 'QTM 3 - OSPF & định tuyến',
    topic: 'Tự luận đọc output show ip route',
    difficulty: 3,
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Routing triangle topology for route output question', caption:'Dựa vào topology R1-R2-R3 và output bảng định tuyến để tìm lỗi route chiều về.'},
    config: 'Tình huống: PC-A 192.168.10.11 ping được gateway R1 nhưng không ping được PC-F 192.168.30.12.\n\nR1#show ip route\nC 192.168.10.0/24 is directly connected, Gig0/1\nC 10.0.12.0/30 is directly connected, Serial0/0/0\nO 192.168.20.0/24 [110/2] via 10.0.12.2, 00:00:12, Serial0/0/0\n\nR3#show ip route\nC 192.168.30.0/24 is directly connected, Gig0/1\nC 10.0.23.0/30 is directly connected, Serial0/0/1\nO 192.168.20.0/24 [110/2] via 10.0.23.1, 00:00:10, Serial0/0/1\n\nR2#show ip ospf neighbor\nNeighbor ID     Pri   State      Dead Time   Address       Interface\n1.1.1.1           0   FULL/-     00:00:33    10.0.12.1    Serial0/0/0\n3.3.3.3           0   FULL/-     00:00:34    10.0.23.2    Serial0/0/1',
    question: 'Tự luận:\na) Từ output, chỉ ra route nào đang thiếu trên R1 hoặc R3 và vì sao PC-A không ping được PC-F.\nb) Nêu 4 lệnh kiểm tra tiếp theo để xác định lỗi nằm ở network statement, interface down, passive-interface hay ACL.\nc) Viết hướng sửa OSPF hoặc static route tối thiểu để hai LAN 192.168.10.0/24 và 192.168.30.0/24 ping được nhau.',
    answer: 'a) R1 chưa có route tới 192.168.30.0/24 và R3 chưa có route tới 192.168.10.0/24. OSPF neighbor R2 với R1/R3 vẫn FULL, nên lỗi nhiều khả năng là thiếu quảng bá LAN A/LAN C hoặc đang passive/sai network statement, không phải do link serial R1-R2/R2-R3 down.\nb) Kiểm: show ip protocols để xem network statement/passive-interface; show run | section router ospf để xem wildcard/area; show ip interface brief để chắc LAN G0/1 up/up; show ip ospf database/show ip route ospf để xem prefix đã vào LSDB chưa; show access-lists nếu route đúng nhưng ping vẫn fail.\nc) Nếu OSPF: trên R1 quảng bá 192.168.10.0 0.0.0.255 area 0; trên R3 quảng bá 192.168.30.0 0.0.0.255 area 0, giữ serial area 0. Nếu static: R1 route 192.168.30.0/24 qua R2 hoặc R3; R3 route 192.168.10.0/24 qua R2 hoặc R1; R2 phải có route transit tương ứng.',
    explanation: 'Dạng này giống đề cho output: đọc bảng route trước, đừng đoán mò từ topology.'
  },
  {
    id: 'QTM-ESSAY-OUTPUT-TRUNK-ACL-01',
    type: 'short',
    lesson: 'QTM 2 - Switching, VLAN, STP',
    topic: 'Tự luận đọc output trunk và ACL',
    difficulty: 3,
    image: {src:'assets/qtm-packet-tracer-error-lab.svg', alt:'Packet Tracer topology with visible error markers', caption:'Kết hợp marker lỗi E1/E3 với output trunk và ACL để xác định nguyên nhân.'},
    config: 'Tình huống: PC-D VLAN30 không truy cập được WEB 192.168.30.50; PC-A VLAN10 cũng bị chặn khi mở HTTP tới WEB.\n\nS2#show interfaces trunk\nPort        Mode         Encapsulation  Status        Native vlan\nGi0/1       on           802.1q         trunking      99\n\nPort        Vlans allowed on trunk\nGi0/1       10,20\n\nCORE#show access-lists VLAN10-IN\nExtended IP access list VLAN10-IN\n10 deny tcp 192.168.10.0 0.0.0.255 host 192.168.30.50 eq 80 (24 matches)\n20 permit ip any any (156 matches)',
    question: 'Tự luận:\na) Dựa vào output, khoanh vùng hai lỗi cấu hình khác nhau và nối chúng với marker trong hình.\nb) Giải thích vì sao PC-D và PC-A cùng không vào WEB nhưng nguyên nhân không giống nhau.\nc) Viết lệnh sửa an toàn, chú ý không làm mất VLAN đang chạy và không mở ACL quá rộng.',
    answer: 'a) Lỗi thứ nhất là trunk S2 Gi0/1 chỉ allow VLAN 10,20 nên VLAN30 không đi qua trunk, khớp marker E1. Lỗi thứ hai là ACL VLAN10-IN deny TCP 80 từ 192.168.10.0/24 tới WEB 192.168.30.50, khớp marker E3.\nb) PC-D thuộc VLAN30 nên bị kẹt ở Layer 2/trunk: VLAN không được carry qua uplink. PC-A thuộc VLAN10, đường đi Layer 2/3 có thể đúng nhưng bị ACL chặn HTTP ở Layer 3/4. Vì vậy sửa trunk không tự sửa ACL và ngược lại.\nc) Trunk: switchport trunk allowed vlan add 30 để thêm VLAN30 mà không ghi đè 10,20. ACL: đặt permit tcp 192.168.10.0 0.0.0.255 host 192.168.30.50 eq 80 trước deny nếu policy cho phép HTTP, hoặc đổi deny chỉ chặn port không được phép. Sau đó kiểm show interfaces trunk, show access-lists hit count, ping/curl HTTP từ PC-A và PC-D.',
    explanation: 'Câu này bắt sinh viên tách lỗi theo tầng: VLAN/trunk khác với ACL dù triệu chứng đều là không vào WEB.'
  },
  {
    id: 'QTM-ESSAY-OUTPUT-VPN-01',
    type: 'short',
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    topic: 'Tự luận đọc output VPN/firewall',
    difficulty: 3,
    image: {src:'assets/qtm-end-to-end-routers.svg', alt:'Clean end-to-end VPN topology', caption:'Topology end-to-end đã tách nhãn khỏi dây, dùng cho bài VPN và route chiều về.'},
    config: 'Tình huống: VPN client nhận IP 10.8.0.10, ping được VPN server 10.8.0.1 nhưng không truy cập được file server 192.168.30.20.\n\nVPN-SRV$ ip route\n10.8.0.0/24 dev tun0 proto kernel scope link src 10.8.0.1\n192.168.30.0/24 via 10.10.30.1 dev eth1\n\nVPN-SRV$ sysctl net.ipv4.ip_forward\nnet.ipv4.ip_forward = 0\n\nVPN-SRV$ iptables -S FORWARD\n-P FORWARD DROP\n-A FORWARD -i tun0 -o eth1 -j ACCEPT',
    question: 'Tự luận:\na) Dựa vào output, chỉ ra ít nhất 2 nguyên nhân khiến VPN client chưa vào được LAN server.\nb) Phân tích route đi và route về của gói tin từ 10.8.0.10 tới 192.168.30.20.\nc) Nêu cấu hình sửa và checklist giám sát để phát hiện lỗi tương tự.',
    answer: 'a) IP forwarding đang tắt nên Linux không forward gói giữa tun0 và eth1. Policy FORWARD mặc định DROP và mới có chiều tun0 -> eth1, thiếu chiều reply eth1 -> tun0 hoặc rule stateful RELATED,ESTABLISHED. Ngoài ra LAN gateway/file server phải có route về 10.8.0.0/24 hoặc VPN server phải NAT hợp lý.\nb) Gói đi: client -> tun0 VPN-SRV -> eth1 -> gateway LAN -> file server. Gói về: file server -> default gateway -> route tới 10.8.0.0/24 qua VPN-SRV hoặc về địa chỉ đã NAT. Thiếu route về sẽ làm request tới nơi nhưng reply mất.\nc) Bật net.ipv4.ip_forward=1, thêm firewall FORWARD hai chiều hoặc stateful, push route 192.168.30.0/24 cho client, thêm route ngược 10.8.0.0/24 trên gateway LAN hoặc NAT/MASQUERADE có kiểm soát. Giám sát process OpenVPN, số client, ping từ VPN-SRV tới file server, port SMB/NFS/FTP, firewall drop log và certificate expiry.',
    explanation: 'Đề VPN hay bẫy ở chỗ connected chưa đủ; phải có forward, firewall và route chiều về.'
  }
);

const NETWORK_ESSAY_REWRITES = {
  'QTM-OSPF-04': {
    image: {src:'assets/qtm-packet-tracer-vlan-addressing.svg', alt:'Packet Tracer campus VLAN topology', caption:'Topology có IP host/default gateway và bảng địa chỉ để phân tích OSPF/VLAN.'},
    config: 'Campus có Core L3, Access switch, DMZ Web, Server LAN và Edge router ra Internet.\nYêu cầu: các VLAN nội bộ liên lạc qua Core, Edge quảng bá default route, DMZ chỉ mở dịch vụ cần thiết.',
    question: 'Tự luận:\na) Dựa vào topology, đề xuất chia VLAN/subnet và vai trò của Core L3, Access switch, Edge router.\nb) Thiết kế OSPF area/default route giữa Core và Edge. Nêu các network cần quảng bá.\nc) Nêu 4 lỗi cấu hình có thể làm VLAN nội bộ không truy cập được DMZ và lệnh kiểm tra tương ứng.',
    answer: 'a) Access switch mang VLAN user/server qua trunk; Core L3 có SVI/gateway và định tuyến liên VLAN; Edge giữ default route, NAT/firewall ra Internet.\nb) Core-Edge nên ở area 0; quảng bá các subnet SVI nội bộ, DMZ/server LAN và link Core-Edge; Edge có default route ra ISP và default-information originate nếu cần.\nc) Lỗi hay gặp: trunk thiếu VLAN -> show interfaces trunk; SVI down/sai gateway -> show ip interface brief; OSPF area/passive sai -> show ip ospf neighbor/show ip protocols; ACL/NAT sai chiều -> show access-lists/show ip nat translations.'
  },
  'QTM-SW-04': {
    question: 'Tự luận:\na) PC VLAN 10 ping được gateway VLAN 10 nhưng không ping được server VLAN 20. Hãy vẽ/diễn giải luồng frame/gói từ PC tới gateway rồi tới server.\nb) Nêu thứ tự kiểm tra Layer 2: VLAN access, trunk allowed VLAN, native VLAN, STP, MAC table.\nc) Nêu thứ tự kiểm tra Layer 3/security: SVI, default gateway, route, ACL/firewall trên server.',
    answer: 'a) PC gửi frame tới MAC gateway VLAN 10; Core/SVI định tuyến sang VLAN 20 rồi ARP tới server. Nếu lỗi có thể nằm ở trunk/SVI/ACL/server gateway.\nb) Kiểm tra show vlan brief, show interfaces trunk, show spanning-tree vlan, show mac address-table.\nc) Kiểm tra show ip interface brief, show ip route, ping source VLAN, show access-lists, firewall host/server route.'
  },
  'QTM-FW-01': {
    question: 'Tự luận:\na) Thiết kế rule firewall cho mô hình Internet - DMZ Web - LAN Database theo nguyên tắc least privilege.\nb) Chỉ rõ rule nào cho Internet vào DMZ, rule nào cho DMZ vào DB, rule nào tuyệt đối không nên mở.\nc) Nêu cách kiểm tra/log khi Web DMZ không kết nối được Database.',
    answer: 'a) Internet chỉ vào DMZ Web đúng 80/443; Web DMZ chỉ tới DB đúng IP/port ứng dụng; quản trị qua VPN/bastion.\nb) Không mở Internet trực tiếp vào DB, không any-any giữa DMZ và LAN, không public SSH/RDP rộng.\nc) Kiểm ACL hit count/log deny, route hai chiều, service DB listen, firewall host DB, tcpdump/curl/telnet port từ web server.'
  },
  'QTM-CLOUD-02': {
    question: 'Tự luận:\na) Dựa vào hình cloud, mô tả luồng request từ Internet tới Pod qua Load Balancer, Ingress, Service.\nb) Giải thích vai trò của readinessProbe/livenessProbe và vì sao Service selector sai làm mất endpoint.\nc) Đề xuất checklist hardening cho web app Docker/Kubernetes/cloud.',
    answer: 'a) Client -> DNS -> LB/WAF -> Ingress Controller -> Service -> Endpoint/Pod -> app container -> database private.\nb) Readiness quyết định Pod nhận traffic; liveness quyết định restart container. Service selector sai label làm endpoint rỗng nên Ingress không có backend.\nc) TLS, RBAC, secret manager, image scan, resource limit, probe, NetworkPolicy, private DB, security group, logging/monitoring, backup.'
  },
  'QTM-BACKUP-01': {
    question: 'Tự luận:\na) Đề xuất quy trình backup cấu hình router/switch/server bằng automation.\nb) Nêu cách lưu trữ/versioning để biết ai đổi gì, lúc nào, trên thiết bị nào.\nc) Nêu cách kiểm chứng backup thật sự restore được khi có sự cố.',
    answer: 'a) Dùng Ansible/SSH/API lấy running-config, cấu hình service, firewall, compose/k8s yaml theo lịch.\nb) Lưu private Git/storage, mã hóa secret, commit message/diff rõ, phân quyền truy cập, cảnh báo khi diff bất thường.\nc) Restore thử trong lab, kiểm checksum/version, tài liệu runbook, định kỳ diễn tập rollback.'
  },
  'QTM-ESSAY-FINAL-01': {
    image: {src:'assets/qtm-packet-tracer-vlan-addressing.svg', alt:'Packet Tracer VLAN topology for final essay', caption:'Topology có bảng VLAN/subnet/default gateway rõ như Packet Tracer.'},
    config: 'Campus gồm VLAN 10 Sinh viên, VLAN 20 Giảng viên, VLAN 30 Server, DMZ Web và Edge NAT ra Internet.\nSự cố: VLAN 20 không truy cập được Web DMZ nhưng vẫn ra Internet được.',
    question: 'Tự luận cuối kỳ:\na) Dựa vào sơ đồ, lập bảng VLAN/subnet/gateway cho 3 phòng ban và DMZ.\nb) Thiết kế routing liên VLAN, OSPF Core-Edge và NAT ra Internet.\nc) Phân tích sự cố VLAN 20 không truy cập được DMZ Web: nêu ít nhất 6 lệnh kiểm tra và kết luận mong đợi.',
    answer: 'a) Cần bảng VLAN ID, subnet, gateway SVI, vị trí server/DMZ rõ ràng.\nb) Core định tuyến liên VLAN, link Core-Edge chạy OSPF area 0, Edge có default route và NAT overload cho LAN ra Internet, static NAT/ACL cho DMZ nếu public.\nc) Kiểm show vlan brief, show interfaces trunk, show ip interface brief, show ip route, show ip ospf neighbor, show access-lists, show ip nat translations, ping/traceroute, log firewall/web.'
  },
  'QTM-ESSAY-FINAL-02': {
    question: 'Tự luận cuối kỳ:\na) Từ output kubectl, chỉ ra vì sao API không truy cập được qua Ingress.\nb) Trình bày luồng request đúng từ Internet vào Pod và vai trò của từng thành phần.\nc) Đề xuất checklist hardening Docker/Kubernetes/cloud cho đồ án triển khai web.',
    answer: 'a) Service selector app=api không khớp Pod label app=web nên endpoints rỗng.\nb) DNS -> Load Balancer/WAF -> Ingress -> Service -> Endpoint/Pod -> container app. Service cần selector đúng, port/targetPort đúng, Pod Ready.\nc) TLS, RBAC, không commit Secret, image scanning, readiness/liveness, limits, NetworkPolicy, private database, security group, logging/monitoring, backup.'
  },
  'QTM-ESSAY-FINAL-03': {
    image: {src:'assets/qtm-routing-triangle-addressing.svg', alt:'Packet Tracer routing topology', caption:'Topology router/PC có IP và default gateway rõ để phân tích VPN/routing.'},
    question: 'Tự luận cuối kỳ:\na) Client VPN kết nối thành công nhưng không vào được server 192.168.10.20. Phân tích đường đi gói tin từ client VPN tới server.\nb) Nêu route/firewall/NAT cần kiểm tra trên VPN server, router LAN và server đích.\nc) Thiết kế giám sát Zabbix cho VPN và file server: item, trigger, cảnh báo.',
    answer: 'a) Client nhận IP tunnel, route tới LAN được push, gói đi qua tun0 tới VPN server rồi forward vào LAN và cần route ngược về subnet VPN.\nb) Kiểm route push, IP forwarding, FORWARD rule tun0-LAN, NAT hoặc route ngược, firewall server, DNS nội bộ nếu dùng tên.\nc) Giám sát process OpenVPN, số client, ping tunnel, port SMB/NFS/FTP, disk, CPU/RAM, failed login, backup status, trigger có duration và action email/Telegram.'
  }
};

Object.entries(NETWORK_ESSAY_REWRITES).forEach(([id, patch]) => {
  const q = NETWORK_QUESTION_BANK.find(item => item.id === id);
  if(q) Object.assign(q, patch);
});

const NETWORK_THEORY_CARDS = [
  {
    lesson: 'QTM 1 - IP, subnet, dịch vụ nền',
    title: 'Subnet, DHCP, DNS, IPv6',
    points: [
      'Nắm CIDR/VLSM, usable host, broadcast, wildcard mask và default gateway.',
      'DHCP relay/ip helper-address rất hay ra khi server khác VLAN.',
      'DNS nội bộ, split-horizon, AD DNS và firewall IPv6 là các bẫy vận hành thường gặp.'
    ]
  },
  {
    lesson: 'QTM 2 - Switching, VLAN, STP',
    title: 'VLAN, trunk, STP, EtherChannel',
    points: [
      'Đọc được allowed VLAN, native VLAN, access/trunk mode và lỗi VLAN không qua uplink.',
      'STP root bridge chọn Bridge ID thấp nhất; PortFast đi với BPDU Guard cho cổng endpoint.',
      'EtherChannel cần khớp mode, VLAN, trunk/access và tốc độ/duplex.'
    ]
  },
  {
    lesson: 'QTM 3 - OSPF & định tuyến',
    title: 'OSPF theo cấu hình thật',
    points: [
      'Neighbor cần khớp area, subnet, timer, authentication; router-id không được trùng.',
      'Phân biệt O, O IA, E1/E2, default-information originate và passive-interface.',
      'Area 0 là backbone; lỗi area mismatch, thiếu route ngược và ACL chặn protocol 89 rất dễ bị hỏi.'
    ]
  },
  {
    lesson: 'QTM 4 - ACL, NAT, firewall',
    title: 'Policy và NAT',
    points: [
      'ACL xử lý từ trên xuống, có implicit deny, extended ACL thường đặt gần nguồn.',
      'NAT overload/PAT, static NAT/port-forward và inside/outside là trọng tâm đọc cấu hình.',
      'Firewall tốt đi theo least privilege, DMZ, stateful return traffic và log deny quan trọng.'
    ]
  },
  {
    lesson: 'QTM 5 - Linux server, VPN, giám sát',
    title: 'Dịch vụ đồ án',
    points: [
      'OpenVPN cần route push, certificate/key, firewall forwarding và split/full tunnel.',
      'NFS/SMB/FTP cần phân quyền, TLS/passive port, segmentation và audit.',
      'Zabbix/monitoring phải có trigger ít nhiễu, health check và cảnh báo theo dịch vụ.'
    ]
  },
  {
    lesson: 'QTM 6 - Docker, Kubernetes, cloud',
    title: 'Container và cloud hiện đại',
    points: [
      'Docker ports là host:container; network/volume/secret tách biệt với image.',
      'Kubernetes hay hỏi selector, Service, Ingress, readiness/liveness, RBAC, Secret và NetworkPolicy.',
      'Cloud tập trung security group, load balancer, private subnet, bastion/VPN và shared responsibility.'
    ]
  },
  {
    lesson: 'QTM 7 - Automation & vận hành',
    title: 'Automation, HAProxy, backup',
    points: [
      'Ansible/idempotent, backup cấu hình, Git diff và restore test là tư duy vận hành tốt.',
      'HAProxy cần health check, thuật toán cân bằng tải, timeout và log.',
      'Đề khó thường bắt giải thích quy trình troubleshoot, không chỉ nêu lệnh đơn lẻ.'
    ]
  }
];
